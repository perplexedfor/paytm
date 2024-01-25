
const express = require('express');
const userRouter = require("./user");
// const app = express();
// const PORT = 3000;
 
// Single routing
const router = express.Router();
 
router.use("/user",userRouter)

module.exports = router;
 
// app.use(router);
 
// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });