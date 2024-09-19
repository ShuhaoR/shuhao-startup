// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");
const applicationRoutes = require("./routes/applications");

const app = express();

app.use(express.json());
app.use(
cors({
  origin: ["https://shuhao-startup.com", "https://shuhao-startup.vercel.app"], // List all your frontend domains
  credentials: true
})
);

app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/requests", requestRoutes); // Request routes
app.use("/api/applications", applicationRoutes); // Application routes
app.use("/uploads", express.static("uploads")); // Serve static files from 'uploads'

const mongoURI =
  "mongodb+srv://ShuhaoR:Bobby1024%21@shuhao-startup.nubp8.mongodb.net/?retryWrites=true&w=majority&appName=Shuhao-Startup";

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


//