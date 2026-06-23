const express = require("mongoose");
const mongoose = require("mongoose");
require('dotenv').config();
exports.connect =() =>{

    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully")

    })
    .catch((err) =>{
        console.log(err);
        console.log('database not connected')
    })
}