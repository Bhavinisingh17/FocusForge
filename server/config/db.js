const mongoose = require("mongoose");

async function connectDb (){

    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/focusForge");
    console.log("connection succefull");
    }

    catch(err){
        console.log(err);
    }

}

module.exports = connectDb();
