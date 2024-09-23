const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single('resumeFile'), async (req, res) => {
  const { name, email, school, major, graduate, skills, GPA } = req.body;
  const resumeFile = req.file.path;  // Assuming file is stored locally and path is needed

  if (!name || !email || !req.file) {  // Check if the file is uploaded
    return res.status(400).json({ error: "Name, email, and resume are required." });
  }

  try {
    const newApplication = new Application({
      name,
      email,
      resumeFile,
      school,
      major,
      graduate,
      skills,
      GPA,
    });
    await newApplication.save();
    res.status(201).json({ message: "Success/提交成功" });
  } catch (error) {
    console.error("Failed to save application:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
