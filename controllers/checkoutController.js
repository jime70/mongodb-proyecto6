const Cart = require("../models/Cart");
const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createCheckoutSession = async (req, res) => {
    const userID = req.user.id;
    const foundClient = await Client.findById(userID);
    const foundCart = await Cart.findById(foundClient.cart).populate("products");

    const line_items = foundCart.products.map((product) => ({
        price: product.priceID,
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: process.env.REACT_BASE_URL,
        cancel_url: process.env.REACT_BASE_URL,
        customer_email: foundClient.email,
    });

    res.json({ session_url: session.url });
};

exports.createOrder = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;
    
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === "charge.succeeded") {
            const paymentIntent = event.data.object;
            const email = paymentIntent.billing_details.email;
            const receiptURL = paymentIntent.receipt_url;

            await Client.findOneAndUpdate(
                { email },
                { $push: { receipts: receiptURL } },
                { new: true }
            );
        }
        
        res.send();
    } catch (error) {
        res.status(400).send("Error en el pago");
    }
};

exports.createCart = async (req, res) => {
    const newCart = await Cart.create(req.body);
    res.json({ cart: newCart });
};

exports.getCart = async (req, res) => {
    const userID = req.user.id;
    const foundClient = await Client.findById(userID);
    const foundCart = await Cart.findById(foundClient.cart);
    res.json({ cart: foundCart });
};

exports.editCart = async (req, res) => {
    const userID = req.user.id;
    const foundClient = await Client.findById(userID);
    const updatedCart = await Cart.findByIdAndUpdate(foundClient.cart, { products: req.body.products }, { new: true });
    res.json({ updatedCart });
};
