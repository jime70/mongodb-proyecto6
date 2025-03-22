const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization'); 
const {
  createCheckoutSession,
  createOrder,
  createCart,
  getCart,
  editCart
} = require('../controllers/checkoutController');

router.post('/create-checkout-session', auth, createCheckoutSession);
router.post('/create-order', auth, createOrder);
router.post('/create-cart', auth, createCart);
router.get('/get-cart', auth, getCart);
router.put('/edit-cart', auth, editCart);

module.exports = router;
