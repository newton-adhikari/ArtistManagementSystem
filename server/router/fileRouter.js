const fileRouter                = require("express").Router();
const { verifyToken }           = require("../middlewares/verifyToken");
const db                        = require("../db/db");
const multer                    = require("multer");
const fs                        = require('fs');
const csv                       = require('csv-parser');
const { randomUUID }            = require("crypto");
const { getCurrentDateTime }    = require("../utils/currentDate");
const { jsonToCSV }             = require("../utils/jsonToCSV");
const results                   = [];


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

fileRouter.post("/upload", verifyToken, upload.single("file"), (req, res) => {
    if (!req.user) return res.status(403).json({status: "error", message: "unauthorized"});

    const headers = ["name", "dob", "gender", "first_release_year", "no_of_albums_released", "address"]
    fs
    .createReadStream('./uploads/data.csv')
    .pipe(csv( {headers}))
    .on('data', (row) => {
        const modified = {...row, id:randomUUID(), gender: (row.gender.toLowerCase() === "male" ? "m": (row.gender.toLowerCase() === "female" ? "f" : "o"))}
        results.push(modified);
                
        // create entry on the database.
        db.getConnection((err, con) => {
            if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
                const {name, dob, gender, address, first_release_year, no_of_albums_released } = modified;

                let query = "SELECT * FROM artist WHERE artist.name = ? AND artist.dob = ?";
                con.query(query, [name, dob], (err, result) => {
                    if (err) return res.status(500).json({status: "error", message: "database error"});

                    if (result.length > 0) return;

                    query = "INSERT INTO artist (`name`, `dob`, `gender`, `address`, `first_release_year`, `no_of_albums_released`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    
                    con.query(query, [name, new Date(dob), gender, address, first_release_year, no_of_albums_released, (req.user.createdAt ? req.user.createdAt : getCurrentDateTime()), getCurrentDateTime()], (err, result) => {
                        con.release();
                        if (err) return;
                        
                    })
                })
        });
    })
    .on('end', () => {
        return res.json(results);
    })
    .on("error", () => {
        return res.status(500).json({status: "error", message: "corrupted csv file"})
    });
})

fileRouter.get("/download", verifyToken, (req, res) => {
    console.log(req.user);
    if (!req.user) return res.status(403).json({status: "error", message: "unauthorized"});

    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        const query = "SELECT * from artist";
        con.query(query, (err, result) => {
            con.release();
            if (err) {
                return res.status(500).json({status: "error", message: "Unable download please try again"});
            }

            const filePath = jsonToCSV(result, new Date().toISOString());
            const fileName = filePath.split("\\")[1];

            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'text/csv');
            fs
                .createReadStream(filePath)
                .pipe(res)
                .on("error", (err) => {
                    res.status(500).json({ status: 'error', message: 'Error streaming the file' });
                    console.log("on error");
                })
                .on("finish", () => {
                    fs.unlink(filePath, (err) => {
                        if(err) {
                            console.log(err);
                        }
                        console.log(`${fileName} deleted successfully`);
                    });
                })
                
        });
    })
})

module.exports = fileRouter;