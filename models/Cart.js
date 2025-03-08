const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // 📌 Relación con cliente
    products: [
        {
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true },
            img: { type: String },
            slug: { type: String },
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
