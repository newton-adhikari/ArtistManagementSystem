const signupRouter            = require("express").Router();
const bcrypt                  = require("bcrypt");
const db                      = require("../db/db");
const { getCurrentDateTime }  = require("../utils/currentDate");

signupRouter.post("/", (req, res) => {
    const {firstName, lastName, email, password, phone, dob, gender, address} = req.body;

    const query = "INSERT INTO user (`first_name`, `last_name`, `email`, `password`, `phone`, `dob`, `gender`, `address`, `created_at`, `updated_at`, `role-type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // WE assume that all the validations check has been made from the frontend
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.json({errror: "Unable to hash the password"});

        const con = db.getConnection((err, connection) => {
            if (err) return res.status(500).json({status: "error", message: "can't connect to the database"});

            const data = [firstName, lastName, email, hash, phone, dob, gender, address, getCurrentDateTime(), getCurrentDateTime(), "artist"];

            // change role is only available to super_admin
            connection.query(query, data, (err, result) => {
                console.log(err);
                if (err) return res.status(500).json({status: "error", message: `${err.message}`});

                return res.status(201).json({status: "Success", message: "User created"});
            });
            
        })
    })
})

module.exports = signupRouter;