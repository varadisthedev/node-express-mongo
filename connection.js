const mongoose = require("mongoose");

async function connectMongoDB(url){
    return mongoose.connect(url); // do mongosh on terminal
}

module.exports={
    connectMongoDB,
};