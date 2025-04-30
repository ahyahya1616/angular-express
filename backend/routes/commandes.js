const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Create a new order
router.post('/', commandeController.createCommande);

// Get all orders
router.get('/', commandeController.getAllCommandes);

// Get a specific order by ID
router.get('/:id', commandeController.getCommandeById);

// Update an order
router.put('/:id', commandeController.updateCommande);

// Delete an order
router.delete('/:id', commandeController.deleteCommande);

// Add a product to an order
router.post('/:id/produits', commandeController.addProduitToCommande);

// Remove a product from an order
router.delete('/:id/produits/:produitId', commandeController.removeProduitFromCommande);

// Calculate total amount for an order
router.get('/:id/total', commandeController.calculateOrderTotal);

module.exports = router;