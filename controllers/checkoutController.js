const Cart = require("../models/Cart");
const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// ✅ Crear una sesión de pago con Stripe
exports.createCheckoutSession = async (req, res) => {
    try {
        const userID = req.user.id;
        const foundClient = await Client.findById(userID);
        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const foundCart = await Cart.findById(foundClient.cart).populate("products");
        if (!foundCart || foundCart.products.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío" });
        }

        const line_items = foundCart.products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: { name: product.name },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            customer_email: foundClient.email,
        });

        res.json({ session_url: session.url });
    } catch (error) {
        console.error("Error en createCheckoutSession:", error);
        res.status(500).json({ error: "Error creando la sesión de pago" });
    }
};

// ✅ Crear una orden cuando se complete el pago
exports.createOrder = async (req, res) => {
    try {
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;

        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const email = session.customer_email;

            await Client.findOneAndUpdate(
                { email },
                { $push: { orders: session.id } },
                { new: true }
            );
        }

        res.json({ received: true });
    } catch (error) {
        console.error("Error en createOrder:", error);
        res.status(400).json({ error: "Error procesando el pago" });
    }
};

// ✅ Crear un carrito de compras
exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.json({ message: "Carrito creado", cart: newCart });
    } catch (error) {
        console.error("Error en createCart:", error);
        res.status(500).json({ error: "Error creando el carrito" });
    }
};

// ✅ Obtener carrito de compras del cliente
exports.getCart = async (req, res) => {
    try {
        const userID = req.user.id;
        const foundClient = await Client.findById(userID).populate("cart");

        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json({ cart: foundClient.cart });
    } catch (error) {
        console.error("Error en getCart:", error);
        res.status(500).json({ error: "Error obteniendo el carrito" });
    }
};

// ✅ Editar el carrito (agregar o actualizar productos)
exports.editCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        const userID = req.user.id;
        const foundClient = await Client.findById(userID);

        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const cart = await Cart.findById(foundClient.cart);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex((p) => p.productID.toString() === productID);

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            cart.products.push({ productID, quantity });
        }

        await cart.save();
        res.json({ message: "Carrito actualizado", cart });
    } catch (error) {
        console.error("Error en editCart:", error);
        res.status(500).json({ error: "Error editando el carrito" });
    }
};

// ✅ Exportar todas las funciones
module.exports = exports;
