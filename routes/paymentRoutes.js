const express = require("express");
const {
    createSession,
    successPayment,
    cancelPayment
} = require ('../controllers/paymentController.js');
const paymentRoutes = express.Router();

paymentRoutes.get('/create-checkout-session', createSession);

paymentRoutes.get('/success', successPayment)

paymentRoutes.get('/cancel', cancelPayment)

module.exports = paymentRoutes;