import { z } from "zod";
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');

const express = require('express');
const router = express.Router();

const SignupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})
const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})
const updateBody = z.object({
    password: Zod.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.put('/',authMiddleware,async (req,res) =>{
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        _id: req.userId
    })
    res.json({
        message:"Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/signup",async (req,res) => {
    const success = SignupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    
    const userId = user._id;
    const balance = await Account.create({
        user: userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.json({
        message: "User Create successfully",
        token: token
    })
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})
module.exports = router;