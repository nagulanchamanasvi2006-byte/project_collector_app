const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    technologies: {
        type: [String],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    studentName: {
        type: String,
        required: true
    },

    githubLink: {
        type: String
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
});

module.exports = mongoose.model("Project", projectSchema);