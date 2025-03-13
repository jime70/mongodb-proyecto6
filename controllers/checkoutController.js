const Cart = require("../models/Cart");
const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ Crear una sesión de pago con Stripe
exports.createCheckoutSession = async (req, res) => {
    try {
        const userID = req.client.id;  // ⚠️ Asegúrate de que `req.client.id` es el correcto
        const foundClient = await Client.findById(userID);
        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const foundCart = await Cart.findById(foundClient.cart).populate("products.productID");
        if (!foundCart || foundCart.products.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío" });
        }

        // 🔹 Formatear los productos para Stripe
        const line_items = foundCart.products.map((product) => ({
            price_data: {
                currency: "clp",
                product_data: { 
                    name: product.productID.name, 
                    images: [product.productID.image] // ⚠️ Agrega imágenes si están disponibles
                },
                unit_amount: Math.round(product.productID.price),
            },
            quantity: product.quantity,
        }));

        // 🔹 Crear la sesión en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/checkout-success`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
            customer_email: foundClient.email,
        });

        res.json({ session_url: session.url });
    } catch (error) {
        console.error("❌ Error en createCheckoutSession:", error);
        res.status(500).json({ error: "Error creando la sesión de pago", details: error.message });
    }
};

// ✅ Webhook para manejar pagos completados en Stripe
exports.createOrder = async (req, res) => {
    try {
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;

        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
            console.error("❌ Error en la validación del webhook:", err);
            return res.status(400).json({ error: `Webhook Error: ${err.message}` });
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const email = session.customer_email;
            const client = await Client.findOneAndUpdate(
                { email },
                { $push: { orders: session.id } },
                { new: true }
            );

            if (client) {
                console.log("✅ Orden creada correctamente para el cliente:", client.email);
            } else {
                console.error("⚠️ No se encontró el cliente con email:", email);
            }
        }

        res.json({ received: true });
    } catch (error) {
        console.error("❌ Error en createOrder:", error);
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
        console.error("❌ Error en createCart:", error);
        res.status(500).json({ error: "Error creando el carrito" });
    }
};

// ✅ Obtener carrito de compras del cliente
exports.getCart = async (req, res) => {
    try {
        const userID = req.client.id;
        const foundClient = await Client.findById(userID).populate("cart");

        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json({ cart: foundClient.cart });
    } catch (error) {
        console.error("❌ Error en getCart:", error);
        res.status(500).json({ error: "Error obteniendo el carrito" });
    }
};

// ✅ Editar el carrito (agregar o actualizar productos)
exports.editCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        const userID = req.client.id;
        const foundClient = await Client.findById(userID);

        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const cart = await Cart.findById(foundClient.cart);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // 🔹 Buscar el producto en el carrito
        const productIndex = cart.products.findIndex((p) => p.productID.toString() === productID);

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1); // 🔹 Si cantidad es 0, elimina el producto
            }
        } else {
            if (quantity > 0) {
                cart.products.push({ productID, quantity });
            }
        }

        await cart.save();
        res.json({ message: "Carrito actualizado", cart });
    } catch (error) {
        console.error("❌ Error en editCart:", error);
        res.status(500).json({ error: "Error editando el carrito" });
    }
};

module.exports = exports;
