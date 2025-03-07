const express = require('express');
const { getAllClients, deleteClientById, ClientRegistration, clientLogin, ClientVerification, updateClientById} = require('../controllers/clientController');
const auth = require('../middleware/authorization');

const clientRoutes = express.Router();

clientRoutes.get('/', getAllClients); //localhost:3003/api/clients/
clientRoutes.post('/register', ClientRegistration); //localhost:3003/api/clients/register
clientRoutes.post('/client-login', clientLogin); //localhost:3003/api/clients/client-login

// Rutas protegidas (requieren autenticación)
clientRoutes.get('/verify-client', auth, ClientVerification); //localhost:3003/api/clients/verify-client
clientRoutes.put('/update/:id', auth, updateClientById); //localhost:3003/api/clients/update/:id
clientRoutes.delete('/:id', auth, deleteClientById); //localhost:3003/api/clients/:id



module.exports = clientRoutes;