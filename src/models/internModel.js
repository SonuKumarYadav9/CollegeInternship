const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Intern Name is required"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true,"Mobile is required"],
        unique: true
    },
    collegeId: {
        type: ObjectId,
        required: [true,"CollegeId is required"],
        ref: 'college'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


module.exports = mongoose.model("Intern", internSchema)