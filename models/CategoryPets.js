const mongoose = require('mongoose');

const categoryPetsSchema =  mongoose.Schema(
   { name: {
        type: String,
        required: function(){return this.isNew}, 
        trim: true 
    },
    race: {
        type: String,
        required: function(){return this.isNew}, 
        trim: true 
    },
    description: {
        type: String,
        required: function(){return this.isNew}, 
        trim: true 
    },
}
)

const CategoryPets = mongoose.model('CategoryPets', categoryPetsSchema);

module.exports = CategoryPets;

// Ejs.
//     Perros ,
//     Labrador ,
//     Raza de perro Labrador ,
//
//     Gatos ,
//     Siames ,
//     Raza de gato Siames ,
