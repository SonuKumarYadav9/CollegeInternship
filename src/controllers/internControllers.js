const internModel = require("../models/internModel");
const validator = require("validator");
const phone = require("libphonenumber-js");

const createInterns = async (req, res) => {
  try {
    let data = req.body;

    if (!Object.keys(data).length) {
      res.status(400).send({
        status: false,
        message: "Please provide some valid data in the body🚫",
      });
    }
    const { name, mobile, email, collegeName } = data;

    if (!isValid(name)) {
      res
        .status(400)
        .send({ status: false, message: "Please enter a valid Name 🚫" });
    }
    if (!phone.isValidNumber(mobile)) {
      res.status(400).send({
        status: false,
        message:
          "Please enter a valid Mobile Number with a valid country code🚫",
      });
    }
    if (!validator.isEmail(email)) {
      res
        .status(400)
        .send({ status: false, message: "Please enter a valid Email Id 🚫" });
    }

    let isDuplicateEmail = await internModel.findOne({ email });

    if (isDuplicateEmail) {
      res.status(400).send({
        status: false,
        message: "Email is already used. Please enter another email 🚫",
      });
    }
    if (!isValid(collegeName)) {
      res
        .status(400)
        .send({ status: false, message: "Enter a valid college name 🚫" });
    }
    let collegeId = await collegeModel
      .findOne({ collegeName: collegeName })
      .populate("name")
      .select({ _id: 1 });

    data = { name, mobile, email, collegeId };

    let result = await internModel.create(data);
    res.status(201).send({ status: true, message: result });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createInterns = createInterns