
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account")

// const app = express();
// const PORT = 3000;
 
// Single routing
const router = express.Router();
 
router.use("/user",userRouter);
router.use("/account",accountRouter);


module.exports = router;
 
// app.use(router);
 
