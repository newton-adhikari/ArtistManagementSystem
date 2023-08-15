const path             = require("path");
const express          = require("express");
const cors             = require("cors");
const bcrypt           = require("bcrypt");
const jwt              = require("jsonwebtoken");
const cookieParser     = require("cookie-parser");
const loginRouter      = require("./router/loginRouter");
const signupRouter     = require("./router/signupRouter");
const userRouter       = require("./router/userRouter");
const artistRouter     = require("./router/artistRouter");
const musicRouter      = require("./router/musicRouter");
const countRecords     = require("./router/countRecords");
const fileRouter       = require("./router/fileRouter");
const PORT             = process.env.PORT || 33330;
const app              = require("express")();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/user", userRouter);
app.use("/api/artist", artistRouter);
app.use("/api/music", musicRouter);
app.use("/api/count", countRecords);
app.use("/api/file", fileRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});