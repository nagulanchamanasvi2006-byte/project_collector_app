
const express = require("express");

const Project = require("../collections/projects");

const router = express.Router();

// Add a new project
router.post("/", async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            message: "Project created successfully",
            project: project
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get a project by ID
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update a project by ID
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after"
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project: project
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
