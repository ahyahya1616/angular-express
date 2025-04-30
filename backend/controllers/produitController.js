const Produit = require('../models/Produit');

// Create a new product
exports.createProduit = async (req, res) => {
    try {
        const produit = new Produit(req.body);
        await produit.save();
        res.status(201).send(produit);
    } catch (err) {
        res.status(400).send({
            message: "Error creating product",
            error: err.message
        });
    }
};

// Get all products
exports.getAllProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).send(produits);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving products",
            error: err.message
        });
    }
};

// Get a specific product by ID
exports.getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(produit);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving product",
            error: err.message
        });
    }
};

// Update a product
exports.updateProduit = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!produit) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send(produit);
    } catch (err) {
        res.status(400).send({
            message: "Error updating product",
            error: err.message
        });
    }
};

// Delete a product
exports.deleteProduit = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndDelete(req.params.id);

        if (!produit) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({
            message: "Error deleting product",
            error: err.message
        });
    }
};