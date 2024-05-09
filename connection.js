//imports
const mongoose = require("mongoose");

async function connectToMongodb(url){
    return mongoose.connect(url);
}

//exports
module.exports = {
    connectToMongodb,
}