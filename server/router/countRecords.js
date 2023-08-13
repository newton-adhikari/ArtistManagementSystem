const countRecords = require("express").Router();
const db           = require("../db/db");
const { verifyToken } = require("../middlewares/verifyToken");

countRecords.get("/", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    console.log("count records")
    const records = {
        userRecords:0,
        artistRecords:0,
        musicRecords:0
    }

    db.getConnection((err, con) => {
        con.query("SELECT COUNT(*) AS totalRecords FROM user", (err, results) => {
            if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

            records.userRecords = results[0].totalRecords;

            con.query("SELECT COUNT(*) AS totalRecords FROM artist", (err, results) => {
                if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

                records.artistRecords = results[0].totalRecords;

                con.query("SELECT COUNT(*) AS totalRecords FROM artist", (err, results) => {
                    con.release();
                    if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
    
                    records.musicRecords = results[0].totalRecords;

                    return res.json(records);
                });
    
            });
        });
    })
})

module.exports = countRecords;