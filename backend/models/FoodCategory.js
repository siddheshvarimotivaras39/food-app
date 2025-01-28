const mongoose = require('mongoose');
// const { Schema } = mongoose;

const foodCatSchema = new mongoose.Schema({
    CategoryName: String,
});
module.exports = mongoose.model('Category', foodCatSchema)
