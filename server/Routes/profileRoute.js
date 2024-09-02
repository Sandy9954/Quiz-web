const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/usermodel');
const bodyParser = require('body-parser');

// Parse JSON bodies
router.use(bodyParser.json());

// Parse URL-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Get user profile route
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