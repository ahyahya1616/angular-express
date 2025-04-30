const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Create a new client
router.post('/', clientController.createClient);

// Get all clients
router.get('/', clientController.getAllClients);

// Get a specific client by ID
router.get('/:id', clientController.getClientById);

// Update a client
router.put('/:id', clientController.updateClient);

// Delete a client
router.delete('/:id', clientController.deleteClient);

// Get all orders for a specific client
router.get('/:id/commandes', clientController.getClientOrders);

module.exports = router;