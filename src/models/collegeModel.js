const mongoose =require('mongoose')
const collegeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        unique:true
    },
    fullName:{
        type:String,
        required:[true, "fullName is required"]
    },
    logoLink:{
        type:String,
        required:[true, "logoLink is required"]
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

module.exports=mongoose.model('college',collegeSchema)
