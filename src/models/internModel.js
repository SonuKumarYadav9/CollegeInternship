const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Intern Name is required",
  },
  email: {
    type: String,
    lowercase: true,
    required: "Email is required",
    unique: true,
  },
  mobile: {
    type: String,
    required: "Mobile is required",
    unique: true,
  },
  collegeId: {
    type: ObjectId,
    required: [true, "CollegeId is required"],
    ref: "college",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Intern", internSchema);
