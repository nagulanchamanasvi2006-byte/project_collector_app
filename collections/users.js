const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    department: {
        type: String
    },

    year: {
        type: Number
    },

    role: {
        type: String,
        enum: ["student", "faculty", "admin"],
        default: "student"
    }
});

module.exports = mongoose.model("User", userSchema);