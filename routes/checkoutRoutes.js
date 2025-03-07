const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const checkoutController = require("../controllers/checkoutController");

/**
 * @swagger
 * /api/checkout/create-checkout-session:
 *   get:
 *     summary: Crear sesión de pago con Stripe
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Sesión de pago creada
 */
router.get("/create-checkout-session", authorization, checkoutController.createCheckoutSession);

/**
 * @swagger
 * /api/checkout/create-order:
 *   post:
 *     summary: Crear orden
 *     tags: [Checkout]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Orden creada
 */
router.post("/create-order", express.raw({ type: "application/json" }), checkoutController.createOrder);

/**
 * @swagger
 * /api/checkout/create-cart:
 *   post:
 *     summary: Crear carrito de compras
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: Carrito creado
 */
router.post("/create-cart", checkoutController.createCart);

/**
 * @swagger
 * /api/checkout/get-cart:
 *   get:
 *     summary: Obtener carrito de compras
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: Carrito de compras obtenido
 */
router.get("/get-cart", authorization, checkoutController.getCart);

/**
 * @swagger
 * /api/checkout/edit-cart:
 *   put:
 *     summary: Editar carrito de compras
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: Carrito actualizado
 */
router.put("/edit-cart", authorization, checkoutController.editCart);

module.exports = router;
