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
        })
    })
})

userRouter.post("/create", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const { firstName, lastName, email, password, phone, dob, gender, address, role} = req.body;
    
    const userRole = roleList[role];

    console.log(gender);
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
                    if (err) return res.status(500).json({status: "error", message: "Database error"});
                  
                    return res.status(201).json({status: "success", message: "created"})
                })
            })
        })
    })
})

module.exports = userRouter;