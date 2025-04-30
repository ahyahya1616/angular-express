const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

// Create a new product
router.post('/', produitController.createProduit);

// Get all products
router.get('/', produitController.getAllProduits);

// Get a specific product by ID
router.get('/:id', produitController.getProduitById);

// Update a product
router.put('/:id', produitController.updateProduit);

// Delete a product
router.delete('/:id', produitController.deleteProduit);

module.exports = router;