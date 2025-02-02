const express = require('express');
const { getAllClients, deleteClientById, ClientRegistration, clientLogin, ClientVerification, updateClientById} = require('../controllers/clientController');
const auth = require('../middleware/authorization');

const clientRoutes = express.Router();
clientRoutes.get('/', getAllClients); //localhost:3003/api/clients/
clientRoutes.delete('/:id', deleteClientById); //localhost:3003/api/clients/:id

clientRoutes.put('/update/:id', updateClientById); //localhost:3003/api/clients/update/:id
clientRoutes.post('/register', ClientRegistration);  //localhost:3003/api/clients/register
clientRoutes.post('/client-login', clientLogin); //localhost:3003/api/clients/client-login
clientRoutes.get('/verify-client', auth, ClientVerification); //localhost:3003/api/clients/verify-client


module.exports = clientRoutes;