const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Client = mongoose.model("clients", clientSchema);

module.exports = Client;