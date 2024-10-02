const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const router = express.Router();

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)  
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('resumeFile'), async (req, res) => {
  const { name, email, school, major, graduate, skills, GPA } = req.body;
  const resumeFile = req.file.path;  

  if (!name || !email || !resumeFile) {
    return res
      .status(400)
      .json({ error: "Name, email, and resume are required." });
  }

  try {
    const newApplication = new Application({
      name,
      email,
      resumeFile, // Store resume as text or URL
      school,
      major,
      graduate,
      skills,
      GPA,
    });
    await newApplication.save();
    res.status(201).json({ message: "Success/提交成功" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
