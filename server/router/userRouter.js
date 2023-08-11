const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
    const token = req.token;
    
    // verify the token and get the data back
    
})

module.exports = userRouter;