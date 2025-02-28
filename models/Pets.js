const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: { // 🔹 Categoría general
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;


// Ejs.
//     Luna ,
//     2 ,
//     Hembra ,
//     Mediano ,
//     60b2e2e0f9f2f2b7c8d0e0a8 ,
//     true ,
//     2021-05-29T00:00:00.000Z
//
//     Max ,
//     3 ,
//     Macho ,
//     Grande ,
//     60b2e2e0f9f2f2b7c8d0e0a8 ,
//     true ,
//     2021-05-29T00:00:00.000Z