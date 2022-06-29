const validator = require("validator");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel"); 

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

    if (!(isValid(logoLink) && validator.isURL(logoLink))) {
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


const getCollege = async (req, res) => {
  try {
    let data = req.query;
    let key = Object.keys(data);

    if (!key.length) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid query params" });
    }
    if (key.length > 1) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Only collegeName query parameter is accepted",
        });
    }
    if (!key.includes("collegeName")) {
      return res
        .status(400)
        .send({ status: false, msg: "collegeName is missing in query params" });
    }

    let value = data.collegeName;

    let collegeData = await collegeModel.findOne({ name: value });

    if (!collegeData) {
      return res
        .status(400)
        .send({ status: false, msg: "No such college exists" });
    }
    const id = collegeData["_id"];

    let internData = await internModel
      .find({ collegeId: id })
      .select({ name: 1, email: 1, mobile: 1 });

    const { name, fullName, logoLink } = collegeData;

    const result = {
      name,
      fullName,
      logoLink,
      internData,
    };
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  createCollege: createCollege,
  getCollege: getCollege,
};
