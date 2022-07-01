const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const validator = require("validator");

const isValid = (ele) => {
  if (typeof ele == "string" && ele.trim().length) return true;
  return false;
};

const createInterns = async (req, res) => {
  try {
    let data = req.body;

    let nameRegex = /^[a-zA-Z]+\s?[a-zA-Z]+\s?[a-zA-Z]{1,20}$/;
    let mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

    if (!Object.keys(data).length) {
      return res.status(400).send({
        status: false,
        message: "Please provide some valid data in the body🚫",
      });
    }
    const { name, mobile, email, collegeName } = data;

    if (!(isValid(name) && nameRegex.test(name))) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid Name 🚫" });
    }

    if (!(isValid(mobile) && mobileRegex.test(mobile))) {
      return res.status(400).send({
        status: false,
        message:
          "Please enter a valid Mobile Number with a valid country code🚫",
      });
    }
    if (!(isValid(email) && validator.isEmail(email))) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid Email Id 🚫" });
    }

    if (!isValid(collegeName)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid college name 🚫" });
    }

    let isDuplicateEmail = await internModel.findOne({ email });

    if (isDuplicateEmail) {
      return res.status(409).send({
        status: false,
        message: "Email is already used. Please enter another email 🚫",
      });
    }

    let isDuplicateMobile = await internModel.findOne({ mobile });

    if (isDuplicateMobile) {
      return res.status(409).send({
        status: false,
        message: "Phone number is already used. Please enter another number 🚫",
      });
    }
    let collegeId = await collegeModel
      .findOne({ name: collegeName, isDeleted: false })
      .select({ _id: 1 });

    if (!collegeId) {
      return res.status(404).send({
        status: false,
        message: "There is no college with this name 🚫",
      });
    }

    collegeId = collegeId["_id"];

    data = { name, mobile, email, collegeId };

    let result = await internModel.create(data);
    return res.status(201).send({ status: true, data: result });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createInterns = createInterns;
