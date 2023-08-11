const signupRouter    = require("express").Router();
const bcrypt          = require("bcrypt");
const db              = require("../db/db");

signupRouter.post("/", (req, res) => {
    const {firstName, lastName, email, password, phone, dob, gender, address, roleType} = req.body;

})

module.exports = signupRouter;