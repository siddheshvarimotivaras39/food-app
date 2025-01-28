const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI

const mongoDB = () => {

    mongoose.connect(mongoURI).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(`${err} Failed to connect database`);
    });
}
module.exports = mongoDB;