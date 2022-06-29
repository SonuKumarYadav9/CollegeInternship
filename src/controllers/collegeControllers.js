const validator = require("validator");
const collegeModel = require("../models/collegeModel");

const isValid = (ele) => {
  if (typeof ele == "string" && ele.trim().length) return true;
  return false;
};

const createCollege = async (req, res) => {
  try {
    let data = req.body;
    let check = Object.keys(data);

    if (!check.length) {
      return res.status(400).send({
        status: false,
        msg: "Please provide valid data in the request body",
      });
    }

    const { name, fullName, logoLink } = data;

    if (!isValid(name)) {
      return res.status(400).send({
        status: false,
        msg: "Please provide a valid name of the college",
      });
    }

    if (!isValid(fullName)) {
      return res.status(400).send({
        status: false,
        msg: "Please provide valid fullName of the college",
      });
    }

    if (!validator.isURL(logoLink)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid link for the logo" });
    }

    let checkName = await collegeModel.findOne({ name });

    if (checkName) {
      return res.status(400).send({
        status: false,
        msg: "Please use a different name",
      });
    }
    let college = { name, fullName, logoLink };

    let result = await collegeModel.create(college);

    res.status(201).send({ status: true, data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};


module.exports = {
  createCollege:createCollege
}