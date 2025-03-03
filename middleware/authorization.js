const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let { authorization } = req.headers;

    console.log("Header recibido en el backend:", authorization); // <-- Agregado

    if (!authorization) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }
    try {
        let [type, token] = authorization.split(" ");

        if (type === "Token" || type === "Bearer") {
            const openToken = jwt.verify(token, process.env.SECRET);
            console.log("Token decodificado:", openToken); // <-- Agregado
            req.user = openToken.user;
            next();
        } else { 
            return res.status(401).json({ msg: "Unauthorized access" });
        }
    } catch (error) {
        res.status(401).json({ msg: "Invalid token", error });
    }
};
