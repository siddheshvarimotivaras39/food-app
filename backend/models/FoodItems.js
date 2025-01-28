const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodItemSchema = new Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: {
        type: Array
    },
    description: String,
});
module.exports = mongoose.model('food_items', foodItemSchema);

