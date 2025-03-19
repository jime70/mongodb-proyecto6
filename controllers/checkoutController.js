const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Client = require("../models/Client");

exports.createCheckoutSession = async (req, res) => {
    try {
        const { cart } = req.body;
        const userID = req.client?.id; 

        if (!userID) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const foundClient = await Client.findById(userID);
        if (!foundClient) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío." });
        }

        const line_items = cart.map((product) => ({
            price_data: {
                currency: "clp",
                product_data: { name: product.name },
                unit_amount: product.price,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/checkout-success`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
            customer_email: foundClient.email,
        });

        res.json({ sessionURL: session.url });

    } catch (error) {
        res.status(500).json({ error: "Error creando la sesión de pago" });
    }
};
