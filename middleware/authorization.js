const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
   
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No hay token, permiso no válido" });
    }

    try {
        console.log("Token recibido en middleware:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.client = decoded; 
        next();
    } catch (error) {
        console.error("Error en la verificación del token:", error);
        res.status(401).json({ msg: "Token no válido" });
    }
};
