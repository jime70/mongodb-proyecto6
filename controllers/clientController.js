const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const users = await Client.find().select('-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({
            msg: "Error obteniendo clientes",
            error: error.message
        });
    }
};

exports.deleteClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const clientDeleted = await Client.findByIdAndDelete(id);

        if (!clientDeleted) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando cliente", error });
    }
};

exports.ClientRegistration = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingClient = await Client.findOne({ email }); // ⚠️ Verifica por email, no username
        if (existingClient) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newClient = new Client({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newClient.save();

        const payload = { user: { id: newClient._id } };  

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            msg: "Registro exitoso",
            token, 
            client: {
                id: newClient._id,
                name: newClient.name,
                email: newClient.email,
                username: newClient.username
            }
        });

    } catch (error) {
        console.error("Error en ClientRegistration:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

exports.clientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcryptjs.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // 🔹 Verificar que la clave secreta está definida
        console.log("Clave JWT cargada en el backend:", process.env.JWT_SECRET);
        
        const token = jwt.sign(
            { id: client._id, email: client.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token, client });

    } catch (error) {
        console.error("Error en clientLogin:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.ClientVerification = async (req, res) => {
    try {
        console.log("Token recibido en verify-client:", req.user); 
        
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Token inválido o usuario no autorizado" });
        }

        const client = await Client.findById(req.user.id).select('-password');
        
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ client });

    } catch (error) {
        console.error("Error en ClientVerification:", error);
        res.status(500).json({ message: "Error interno en la verificación", error });
    }  
};

exports.updateClientById = async (req, res) => {
    try {
        const idClient = req.params.id;
        const client = req.body;

        if (client.password) {
            const salt = await bcryptjs.genSalt(10);
            client.password = await bcryptjs.hash(client.password, salt);
        }

        const updatedClient = await Client.findByIdAndUpdate(idClient, client, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ message: "Cliente actualizado correctamente", updatedClient });
    } catch (error) {
        res.status(500).json({ message: "Error actualizando cliente", error });
    }
};
