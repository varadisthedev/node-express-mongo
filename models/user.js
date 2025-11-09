const mongoose = require("mongoose");


// schema 
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    }
},{timestamps:true}); // now we will make a model of this schema 

const User=mongoose.model("user",userSchema);

module.exports=User;
