const artistRouter               = require("express").Router();
const { verifyToken }          = require("../middlewares/verifyToken");
const db                       = require("../db/db");
const { getCurrentDateTime }   = require("../utils/currentDate");
const roleList                 = require("../utils/rolesList");

artistRouter.get("/all", verifyToken, (req, res) => {  
    console.log("in the /all route");  
    // verify the token and get the data back
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        const query = "SELECT * from artist";
        con.query(query, (err, result) => {
            con.release();
            if (err) {
                return res.status(500).json({status: "error", message: "Unable to prepare query"});
            }

            return res.json(result);
        });
    })
})

artistRouter.post("/create", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const { name, dob, gender, address, firstReleased, albums} = req.body;
    
    console.log(albums);
    // get connection to database;
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});


            query = "INSERT INTO artist (`name`, `dob`, `gender`, `address`, `first_release_year`, `no_of_albums_released`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            
            con.query(query, [name, new Date(dob), gender, address, firstReleased, albums, (req.user.createdAt ? req.user.createdAt : getCurrentDateTime()), getCurrentDateTime()], (err, result) => {
                con.release();
                console.log(err);
                if (err) return res.status(500).json({status: "error", message: "Database error"});
                
                return res.status(201).json({status: "success", message: "created"}); // res.status(200).end();
            })
        })
    })

artistRouter.put("/update/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id                      = req.params.id;
    const { phone, address, role} = req.body
    roleType                      = roleList[role];
    
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
        
        const query = "UPDATE user set `phone` = ?, `address` = ?, `role-type` = ? WHERE id = " + id ;
        con.query(query, [phone, address, roleType], (err, result) => {
            con.release();

            if (err) return res.status(500).json({status: "error", message: "Database error"});

            console.log(result);
            return res.status(200).json({ status: "success", message: "User updated successfully" });
        })
    })
})

artistRouter.delete("/delete/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id = req.params.id;

    console.log(id);
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
        
        const query = "DELETE FROM user WHERE id = " + id ;
        con.query(query, (err, result) => {
            con.release();
            if (err) return res.status(500).json({status: "error", message: "Database error"});

            console.log("deleted");
            return res.status(200).json({status: "success", message: "User deleted successfully"});
        })
    })
})

artistRouter.get("/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id = req.params.id;
    
    const query = "SELECT * FROM user WHERE user.id = ?";
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        con.query(query, [id], (err, result) => {
            con.release();
            if (err) return res.status(500).json({status: "error", message: "Database error"});

            let toSend = result[0];
            toSend = {
                firstName: toSend.first_name, 
                lastName: toSend.last_name, 
                email: toSend.email, 
                phone: toSend.phone, 
                dob: toSend.dob !== "0000-00-00 00:00:00" 
                    ? new Date(toSend.dob).toISOString().split('T')[0] 
                    : "",
                gender: toSend.gender, 
                address: toSend.address, 
                role: toSend["role-type"] === "super_admin" 
                    ? "Admin" 
                    : (toSend["role-type"] === "artist" ? "Artist" : "ArtistManager")
            };
            res.json(toSend);
        })
    })
})

module.exports = artistRouter;