const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
    unique: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: "fullName is required",
    trim: true,
  },
  logoLink: {
    type: String,
    required: "logoLink is required",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("college", collegeSchema);
