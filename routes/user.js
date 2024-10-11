const express = require('express');
const router = express.Router();
const userModel = require("../models/users")
const bcrypt = require("bcryptjs")
const CryptoJS = require("crypto-js");


router.post("/login", async (req, res) => {
    try {
        const data = req.body

        console.log("data", data);
        // return  

        if (!data.email || data.email == "" || data.email == null || typeof data.email == undefined) {
            throw "Email is required"
        }

        if (!data.password || data.password == "" || data.password == null || typeof data.password == undefined) {
            throw "password is required"
        }

        const user = await userModel.findOne({ email: data.email })

        if (user == null) {
            throw "Invalid credentials"
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "invalid credentials" });
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify({ email: user.email }), process.env.encryptionSecret).toString();

        res.cookie('authToken', token, {
            httpOnly: true, // This ensures that the cookie is not accessible via JavaScript (for security)
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 24 * 60 * 60 * 1000 // Set expiration for 1 day (in milliseconds)
        });


        return res.status(200).json({ success: true, message: "user loged in", token: token })

    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: e })
    }
})

router.post("/register", async (req, res) => {
    try {
        const data = req.body

        console.log("data", data);
        if (!data.email || data.email == "" || data.email == null || typeof data.email == undefined) {
            throw "Email is required"
        }
        if (!data.password || data.password == "" || data.password == null || typeof data.password == undefined) {
            throw "Email is required"
        }
        if (!data.secret || data.secret == "" || data.secret == null || typeof data.secret == undefined) {
            throw "Secret Number is required"
        }


        if (data.secret !== process.env.secret) {
            throw "invalid secret"
        }


        const checkUser = await userModel.findOne({ email: data.email })

        if (checkUser != null) {
            throw "user already registered"
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const createUser = await userModel.create({
            email: data.email,
            password: hashedPassword,
        })

        return res.status(200).json({ success: true, message: "user registered" })

    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: e })
    }
})


module.exports = router