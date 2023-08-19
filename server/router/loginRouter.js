require("dotenv").config();
const loginRouter = require("express").Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", (req, res) => {
    // username and password must be present
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({status: "error", message: "email and password are required"});    

    connection.getConnection((err, con) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Connection error"})
        }

        const query = "SELECT * FROM user where user.email = ?" // need to verify the password hash
        con.query(query, [email], (err, result) => {
            if (err) {
                return res.status(400).json({status: "error", message: "Unable to execute query"})
            }

            if (result.length === 0) return res.status(400).json({status: "error", message: "Invalid Credentials"});

            const user = result[0];

            // compare the password hash
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        // create jwt
                        const token = jwt.sign(
                            {
                            "firstName": user.first_name,
                            "email": user.email,
                            "role": user['role-type']
                            }, 
                            process.env.SECRET,
                            {expiresIn: "1d"}
                        );
                        return res.json({
                            "firstName": user.first_name,
                            "email": user.email,
                            "role": user['role-type'],
                            token
                        });
                    }
                    else {
                        return res.status(401).json({status: "error", message: "Invalid credentials"});
                    }
                })
                .catch(err => {
                    return res.status(500).json({status: "error", message: err.message})
                })
            con.release();
        })
    })
})


module.exports = loginRouter;