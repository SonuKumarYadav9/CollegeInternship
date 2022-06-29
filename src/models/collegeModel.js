const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "name is required",
      unique: true,
    },
    fullName: {
      type: String,
      required: "fullName is required",
    },
    logoLink: {
      type: String,
      required: "logoLink is required",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
