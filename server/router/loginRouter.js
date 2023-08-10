const loginRouter = require("express").Router();
const connection = require("../db/db");
const bcrypt = require("bcrypt");

loginRouter.post("/", (req, res) => {
    console.log(req.body);

    // username and password must be present
    const { email, password } = req.body;

    connection.getConnection((err, con) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Connection error"})
        }

        const query = "SELECT * FROM user where user.email = ? and user.password = ?" // need to verify the password hash
        con.query(query, [email, password], (err, result) => {
            if (err) {
                return res.status(400).json({status: "error", message: "Unable to execute query"})
            }
            
            if(result.length > 0) return res.json({status: "success"});

            return res.status(401).json({status: "error", message: "Invalid credentials"});

        })
    })
})


module.exports = loginRouter;