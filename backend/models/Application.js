const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeFile: { type: file, required: true }, // Store resume as text or URL
  school: { type: String }, // New field for school
  major: { type: String }, // New field for major
  graduate:{ type: String, required: true},
  skills:{type:String,require:true},
  GPA:{type:Float,require:true},
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Application", applicationSchema);
