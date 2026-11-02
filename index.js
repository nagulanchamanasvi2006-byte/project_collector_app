
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required. Add it to the root .env file or backend environment variables.");
}

const userroutes = require("./routes/userroutes");
const projectroutes = require("./routes/projectroutes");
const categoryroutes = require("./routes/categoryroutes");
const authroutes = require("./collections/authroutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userroutes);
app.use("/api/project", projectroutes);
app.use("/api/category", categoryroutes);
app.use("/api/auth", authroutes);

// Home route
app.get("/", (req, res) => {
    res.send("Project Collector App Backend is running");
});

// MongoDB Connection
mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project_collector"
)
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((error) => {
    console.log("MongoDB connection error:", error.message);
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
