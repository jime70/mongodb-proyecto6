const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const users = await Client.find().select('-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({
            msg: "There was an error fetching the clients",
            error: error.message
        });
    }
};

exports.deleteClientById = async (req, res) => { 
    try {
        const { id } = req.params;
        const clientDeleted = await Client.findByIdAndDelete(id);
        return res.json({ clientDeleted});
    } catch (error) {
        res.status(500).json({ message: 'There was an error deleting the clients, please try again', error });
    }
};


exports.ClientRegistration = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingClient = await Client.findOne({ username });
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

        res.status(201).json({ msg: "Registro exitoso", client: newClient });
    } catch (error) {
        console.error("Error en ClientRegistration:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};
exports.clientLogin = async (req, res) => { 
    const { email, password } = req.body;
    try {
        let foundCient = await Client.findOne({ email });
        if (!foundCient) {
            return res.status(400).json({ message: 'The email does not exist, verify information.' });
        }
        const correctPassword = await bcryptjs.compare(password, foundCient.password); 
        if (!correctPassword){
            return res.status(400).json({ message: 'The email or the password does not exist, please try again.' });
        }
        const payload = { user: {  id: foundCient.id } };
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        )
    } catch (error) {
        res.json({
            message: "Something went wrong",
            error
        })
    }
}

exports.ClientVerification = async (req, res) => { 
    try {
        const client = await Client.findById(req.user.id).select('-password');
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: "There was an error verifying client", error });
    }  
}

exports.updateClientById = async (req, res) => { 
    try {
        const idClient  = req.params.id;

        const client = req.body;
 
        if (client.password) {
            const { password } = client;
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            client.password = hashedPassword;
        }


        const updateClient = await Client.findByIdAndUpdate(idClient,  client , { new: true });
        res.json({updateClient});
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the information', error });
    }
};