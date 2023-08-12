const userRouter               = require("express").Router();
const { verifyToken }          = require("../middlewares/verifyToken");
const bcrypt                   = require("bcrypt");
const db                       = require("../db/db");
const { getCurrentDateTime }   = require("../utils/currentDate");
const roleList                 = require("../utils/rolesList");

userRouter.get("/all", verifyToken, (req, res) => {  
    console.log("in the /all route");  
    // verify the token and get the data back
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        const query = "SELECT * from user";
        con.query(query, (err, result) => {
            con.release();
            if (err) {
                return res.status(500).json({status: "error", message: "Unable to prepare query"});
            }

            const results = result.map(d => {
                return {
                    id: d.id,
                    fullName: `${d.first_name} ${d.last_name}`,
                    emai: d.email,
                    phone: d.phone,
                    dob: d.dob,
                    gender: d.gender,
                    address: d.address,
                    role: d["role-type"]
                }
            })
            return res.json(results);
        });
    })
})

userRouter.post("/create", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const { firstName, lastName, email, password, phone, dob, gender, address, role} = req.body;
    
    const userRole = roleList[role];

    bcrypt.hash(password, 10, (err, hash) => {
        // get connection to database;
        db.getConnection((err, con) => {
            if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

            let query = "SELECT * FROM user where email = ?";
            con.query(query, [email], (err, result) => {
                if (err) return res.status(500).json({status: "error", message: "Unable to prepare query"});

                if(result.length > 0) return res.status(400).json({status: "error", message: "Email already exist"});

                query = "INSERT INTO user (`first_name`, `last_name`, `email`, `password`, `phone`, `dob`, `gender`, `address`, `created_at`, `updated_at`, `role-type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                con.query(query, [firstName, lastName, email, hash, phone, dob, gender, address, req.user.createdAt, getCurrentDateTime(), userRole], (err, result) => {
                    con.release();
                    if (err) return res.status(500).json({status: "error", message: "Database error"});
                  
                    return res.status(201).json({status: "success", message: "created"})
                })
            })
        })
    })
})

userRouter.put("/update/:id", verifyToken, (req, res) => {
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

userRouter.delete("/delete/:id", verifyToken, (req, res) => {
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

userRouter.get("/:id", verifyToken, (req, res) => {
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
                dob: new Date(toSend.dob).toISOString().split('T')[0],
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

module.exports = userRouter;