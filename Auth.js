const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../utils/validation");
require("dotenv").config();

exports.userSignup = async(req, res) => {

    try{
        // fetch data
        const signupBody = req.body;

        // validation
        if (!signupSchema.safeParse(signupBody).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        if (signupBody.password !== signupBody.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }

        // check if user already exists
        const user = await User.findOne({email: signupBody.email});

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // hash the password
        const hashed = await bcrypt.hash(signupBody.password, 10);

        // create entry in DB
        const newuser = await User.create({
            firstName: signupBody.firstName,
            lastName: signupBody.lastName,
            email: signupBody.email,
            password: hashed
        });
        
        // send response
        return res.status(200).json({
            success: true,
            message: "User Signed Up"
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error signing up",
            error: err.message
        });
    }

}

exports.userLogin = async(req, res) => {
    try{
        // fetch data
        const loginBody = req.body;
        // console.log(email + " " + password);

        // validate data
        if (!loginSchema.safeParse(loginBody)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if User exists or not
        const user = await User.findOne({
            email: loginBody.email
        });

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User does not exist"
            });
        }

        // compare the passwords
        if (await bcrypt.compare(loginBody.password, user.password)) {
            const payload = {
                userId: user._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.password = undefined;
            user.token = token;

            return res.cookie("token", token, {
                expiresIn: "2h",
                httpOnly: true
            }).status(200).json({
                success: true,
                message: "Logged In",
                user, token
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error logging in",
            error: err.message
        });
    }
}

exports.fetchUser = async (req, res) => {
    try {
        
        const userId = req.user.userId;

        const user = await User.findById(userId).populate('posts');

        return res.status(200).json({
            success: true,
            message: "User Fetched",
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}