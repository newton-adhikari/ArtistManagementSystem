const express          = require("express");
const cors             = require("cors");
const bcrypt           = require("bcrypt");
const jwt              = require("jsonwebtoken");
const cookieParser     = require("cookie-parser");
const loginRouter      = require("./router/loginRouter");
const signupRouter     = require("./router/signupRouter");
const PORT             = process.env.PORT || 33330;
const app              = require("express")();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});