require("dotenv").config();
const jwt       = require("jsonwebtoken");
const db        = require("../db/db");
const connection = require("../db/db");

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

const verifyToken = (req, res, next) => {
    const token = getTokenFrom(req);

    if (!token) return res.status(401).json({status: "Error", message: "Token unavailable"});

    const decoded = jwt.verify(token, process.env.SECRET);
    
    // find the user from the email
    const connection = db.getConnection((err, con) => {
        if (err) return res.json({status: "error", message: "Can't connect to database"});

        const query = "SELECT * FROM user where email = ?"
        con.query(query, [decoded.email], (err, result) => {
            con.release();
            if (err) return res.status(500).json({status: "error", message: "unable to process query"});

            if(result.length === 0) return res.status(401).json({status: "error", message: "Unauthorized"});

            const data = result[0];
            const user = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                role: data["role-type"],
                createdAt: data.created_at
            }
            
            req.user = user;
            next();
        })
    })
}

module.exports  = { verifyToken }