const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ Crear una sesión de pago con Stripe
const createCheckoutSession = async (req, res) => {
  try {
    console.log("📥 Recibiendo datos del carrito en el backend:", req.body);

    const { cart } = req.body; // 🟢 Recibimos el carrito desde el frontend

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    const line_items = cart.map((item) => {
      return {
        price: item.price, // Este debe ser el priceID generado desde Stripe
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/checkout-success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
    });

    console.log("✅ Sesión de pago creada:", session.url);
    res.json({ sessionURL: session.url });
  } catch (error) {
    console.error("❌ Error al crear la sesión de pago:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago", details: error.message });
  }
};

// Otras funciones dummy por ahora (puedes reemplazarlas con lógica real)
const createOrder = (req, res) => {
  res.json({ message: "Orden creada" });
};

const createCart = (req, res) => {
  res.json({ message: "Carrito creado" });
};

const getCart = (req, res) => {
  res.json({ message: "Carrito obtenido" });
};

const editCart = (req, res) => {
  res.json({ message: "Carrito editado" });
};

module.exports = {
  createCheckoutSession,
  createOrder,
  createCart,
  getCart,
  editCart,
};
