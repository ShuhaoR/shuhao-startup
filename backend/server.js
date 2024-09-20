// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");
const applicationRoutes = require("./routes/applications");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://shuhao-startup.com",
      "https://shuhao-startup.vercel.app",
      "https://ffsh.vercel.app",
      "http://localhost:5000", // Add this if you're testing on localhost
      "http://localhost:5001", // Add this if your frontend is on port 5002
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/requests", requestRoutes); // Request routes
app.use("/api/applications", applicationRoutes); // Application routes
app.use("/uploads", express.static("uploads")); // Serve static files from 'uploads'

// MongoDB connection URI
const mongoURI =
  "mongodb+srv://ShuhaoR:Bobby1024%21@shuhao-startup.nubp8.mongodb.net/?retryWrites=true&w=majority&appName=Shuhao-Startup";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Server listening on the correct port for Render or other hosting services
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
