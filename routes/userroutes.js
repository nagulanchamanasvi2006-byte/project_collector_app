const express = require("express");
const User = require("../collections/users");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const user = new User(req.body);

        await user.save();

        console.log("Saved user:", user);

        res.status(201).json({
            message: "User saved successfully",
            user: user
        });
    } catch (error) {
        console.log("Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;