const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Article = require("../models/Articles");

const createStripeProduct = async (req, res) => {
  try {
    const { articleID } = req.params;
    
    const article = await Article.findById(articleID);
    if (!article) return res.status(404).json({ message: "Producto no encontrado" });

    const product = await stripe.products.create({
      name: article.name,
      description: article.description,
    });

    const priceData = await stripe.prices.create({
      unit_amount: article.price,
      currency: "clp",
      product: product.id,
    });

    console.log("Producto creado en Stripe:", product.id);
    console.log("Price ID generado:", priceData.id);

    article.stripeProductID = product.id;
    article.priceID = priceData.id;
    await article.save();

    res.json({ message: "Producto actualizado con Stripe", article });
  } catch (error) {
    console.error("❌ Error al crear producto en Stripe:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío." });
    }

    // Crear la línea de pago con los productos del carrito
    const lineItems = cart.map((item) => ({
      price: item.priceID,
      quantity: item.quantity,
    }));

    // Crear sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ sessionURL: session.url });
  } catch (error) {
    console.error("❌ Error en la sesión de pago:", error);
    res.status(500).json({ message: "Error al procesar la sesión de pago" });
  }
};

module.exports = { createStripeProduct, createCheckoutSession };
