const countRecords = require("express").Router();
const db           = require("../db/db");
const { verifyToken } = require("../middlewares/verifyToken");

countRecords.get("/", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

})

module.exports = countRecords;