const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['article', 'pet', 'client'], // Define los tipos posibles
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
