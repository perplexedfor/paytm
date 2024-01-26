import { z } from "zod";
const { User } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

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