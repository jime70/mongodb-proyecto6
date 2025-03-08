const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const checkoutController = require("../controllers/checkoutController");

/**
 * @swagger
 * /api/checkout/create-checkout-session:
 *   post:
 *     summary: Crear sesión de pago con Stripe
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Sesión de pago creada
 *       400:
 *         description: Error en la solicitud
 */
router.post("/create-checkout-session", authorization, checkoutController.createCheckoutSession);

/**
 * @swagger
 * /api/checkout/create-order:
 *   post:
 *     summary: Crear orden después del pago exitoso
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
 *         description: Orden creada exitosamente
 *       400:
 *         description: Error en la creación de la orden
 */
router.post("/create-order", express.raw({ type: "application/json" }), checkoutController.createOrder);

/**
 * @swagger
 * /api/checkout/create-cart:
 *   post:
 *     summary: Crear un nuevo carrito para el usuario autenticado
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Carrito creado exitosamente
 *       400:
 *         description: Error en la creación del carrito
 */
router.post("/create-cart", authorization, express.json(), checkoutController.createCart);

/**
 * @swagger
 * /api/checkout/get-cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Carrito de compras obtenido correctamente
 *       400:
 *         description: Error al obtener el carrito
 */
router.get("/get-cart", authorization, checkoutController.getCart);

/**
 * @swagger
 * /api/checkout/edit-cart:
 *   put:
 *     summary: Editar el carrito del usuario autenticado
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     name:
 *                       type: string
 *                     img:
 *                       type: string
 *                     slug:
 *                       type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *       400:
 *         description: Error al actualizar el carrito
 */
router.put("/edit-cart", authorization, express.json(), checkoutController.editCart);

module.exports = router;
