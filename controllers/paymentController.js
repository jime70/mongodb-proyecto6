const Stripe = require('stripe')
const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Articles')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createSession = async (req, res) => {
    const { nameArticle, descCorta, image, priceArticle, quantity  } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'clp',
                        product_data: {
                            name: nameArticle,
                            description: descCorta,
                            images: [image],
                        },
                        unit_amount: priceArticle.unit_amount,
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `http://${process.env.SUCCESS_URL}/success`,
            cancel_url: `http://${process.env.CANCEL_URL}/cancel`,
        });
        return res.json(session);
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return res.status(500).json({ error: 'Failed to create session' });
    }
};

exports.successPayment = (req, res) => {
    res.send('Success Route');
}

exports.cancelPayment = (req, res) => {
    res.send('Cancel Route');
}