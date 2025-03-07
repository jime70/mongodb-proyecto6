const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: function(){ return this.isNew },
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: function(){ return this.isNew },
        trim: true,
        unique: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        default: null,
    },
    password: {
        type: String,
        required: function(){ return this.isNew },
        trim: true
    },
    category: { // 🔹 Categoría general (Ejemplo: "Cliente VIP", "Cliente Estándar")
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    addressUser: { 
        street1: { type: String } ,
        street2:{ type: String } , 
        region:{ type: String } , 
        city: { type: String } , 
        zip:{ type: String }
    },
    phoneUser: {
        phone1:{ type: Number }, 
        phone2:{ type: Number }
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Client", clientSchema);


// Ejs.
//     Juan Perez ,
//     JuanP ,
//     juanp@gmail.com
//     123456 ,
//     {
//         street1: "Calle 123",
//         street2: "Calle 456",
//         state: "Bogota",
//         city: "Bogota",
//         zip: "110111"
//     },
//     {
//         phone1: 123456,
//         phone2: 123456
//     },
//     [
//         {
//             namePet: "Luna",
//             petId: "60b2e2e0f9f2f2b7c8d0e0a8"
//         },
//     ],
//     [
//         {
//             nameProduct: "Croquetas de Carne",
//             productId: "60b2e2e0f9f2f2b7c8d0e0a8",
//             quantity: 1,
//             price: 5000,
//             tax: 1000,
//             total: 6000
//         },
//     ],
//     2021-05-29T00:00:00.000Z
//     2021-05-29T00:00:00.000Z