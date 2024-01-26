
const express = require('express');
const userRouter = require("./user");
// const app = express();
// const PORT = 3000;
 
// Single routing
const router = express.Router();
 
router.use("/user",userRouter)

module.exports = router;
 
// app.use(router);
 
