const express = require('express');
const bodyParser = require('body-parser');
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors'); // Import the cors middleware
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const app = express();

// Parse JSON bodies
router.use(bodyParser.json());

// Parse URL-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
router.use(cors());

// user registration
router.post("/register", async(req, res) => {
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();

        res.send({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

// user login
router.post("/login", async(req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false });
        }

        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(200).send({ message: "Invalid password", success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.send({
            message: "User logged in successfully",
            success: true,
            data: token,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
router.post("/get-user-info", authMiddleware, async(req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: "User info fetched successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});
module.exports = router;