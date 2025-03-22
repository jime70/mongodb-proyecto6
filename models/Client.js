const mongoose = require("mongoose");


const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", default: null }, 
    password: { type: String, required: true, trim: true },
    addressUser: {
      street1: { type: String },
      street2: { type: String },
      region: { type: String },
      city: { type: String },
      zip: { type: String },
    },
    phoneUser: {
      phone1: { type: Number },
      phone2: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
