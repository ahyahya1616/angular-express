const Commande = require('../models/Commande');
const Produit = require('../models/Produit');

exports.createCommande = async (req, res) => {
    try {
        const commande = new Commande(req.body);
        await commande.save();

        // Populate the saved order with client and product details
        const populatedCommande = await Commande.findById(commande._id)
            .populate('client')
            .populate('lignesCmd.produit');

        res.status(201).send(populatedCommande);
    } catch (err) {
        res.status(400).send({
            message: "Error creating order",
            error: err.message
        });
    }
};

// Get all orders
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find()
            .populate('client')
            .populate('lignesCmd.produit');
        res.status(200).send(commandes);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving orders",
            error: err.message
        });
    }
};

// Get a specific order by ID
exports.getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate('client')
            .populate('lignesCmd.produit');

        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send(commande);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving order",
            error: err.message
        });
    }
};

// Update an order
exports.updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Populate the updated order with client and product details
        const populatedCommande = await Commande.findById(commande._id)
            .populate('client')
            .populate('lignesCmd.produit');

        res.status(200).send(populatedCommande);
    } catch (err) {
        res.status(400).send({
            message: "Error updating order",
            error: err.message
        });
    }
};

// Delete an order
exports.deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);

        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).send({
            message: "Error deleting order",
            error: err.message
        });
    }
};

// Add a product to an order
exports.addProduitToCommande = async (req, res) => {
    try {
        const { produitId, qte } = req.body;

        // Find the order
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Verify that the product exists
        const produit = await Produit.findById(produitId);
        if (!produit) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Add the product to the order's lignesCmd array
        commande.lignesCmd.push({ produit: produitId, qte });
        await commande.save();

        // Return the updated order with populated fields
        const updatedCommande = await Commande.findById(req.params.id)
            .populate('client')
            .populate('lignesCmd.produit');

        res.status(200).send(updatedCommande);
    } catch (err) {
        res.status(400).send({
            message: "Error adding product to order",
            error: err.message
        });
    }
};

// Remove a product from an order
exports.removeProduitFromCommande = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Find the index of the product in the lignesCmd array
        const itemIndex = commande.lignesCmd.findIndex(
            item => item.produit.toString() === req.params.produitId
        );

        if (itemIndex === -1) {
            return res.status(404).send({ message: "Product not found in this order" });
        }

        // Remove the product from the lignesCmd array
        commande.lignesCmd.splice(itemIndex, 1);
        await commande.save();

        // Return the updated order with populated fields
        const updatedCommande = await Commande.findById(req.params.id)
            .populate('client')
            .populate('lignesCmd.produit');

        res.status(200).send(updatedCommande);
    } catch (err) {
        res.status(400).send({
            message: "Error removing product from order",
            error: err.message
        });
    }
};

// Calculate total amount for an order
exports.calculateOrderTotal = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate('lignesCmd.produit');

        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }


        let totalAmount = 0;
        for (const item of commande.lignesCmd) {
            totalAmount += item.produit.pu * item.qte;
        }

        res.status(200).send({ totalAmount });
    } catch (err) {
        res.status(500).send({
            message: "Error calculating total amount",
            error: err.message
        });
    }
};