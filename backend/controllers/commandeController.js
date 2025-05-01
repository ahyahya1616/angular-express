const Commande = require('../models/Commande');
const Produit = require('../models/Produit');

exports.createCommande = async (req, res) => {
    try {
        const commande = new Commande(req.body);

        for (const ligneCmd of commande.lignesCmd) {
            const produit = await Produit.findById(ligneCmd.produit);
            if (produit) {
                ligneCmd.prix_unitaire = produit.prix_ht;
            }
        }

        await commande.save();

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

exports.calculateOrderTotal = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate('lignesCmd.produit');

        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }

        let totalHT = 0;
        let totalTTC = 0;

        for (const item of commande.lignesCmd) {
            const prixHT = item.prix_unitaire || item.produit.prix_ht;
            const prixTTC = prixHT * 1.20;

            totalHT += prixHT * item.qte;
            totalTTC += prixTTC * item.qte;
        }

        res.status(200).send({
            totalHT,
            totalTTC
        });
    } catch (err) {
        res.status(500).send({
            message: "Error calculating total amount",
            error: err.message
        });
    }
};


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

exports.addProduitToCommande = async (req, res) => {
    try {
        const { produitId, qte } = req.body;

        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: "Order not found" });
        }
        const produit = await Produit.findById(produitId);
        if (!produit) {
            return res.status(404).send({ message: "Product not found" });
        }

        commande.lignesCmd.push({
            produit: produitId,
            qte,
            prix_unitaire: produit.prix_ht
        });

        await commande.save();

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



exports.getClientOrderDetails = async (req, res) => {
    try {
        const clientId = req.params.clientId;

        const commandes = await Commande.find({ client: clientId })
            .populate('client')
            .populate('lignesCmd.produit');

        if (!commandes || commandes.length === 0) {
            return res.status(404).send({ message: "No orders found for this client" });
        }

        const orderDetails = commandes.map(commande => {
            let totalHT = 0;
            let totalTTC = 0;

            const lignes = commande.lignesCmd.map(ligne => {
                const prixHT = ligne.prix_unitaire || ligne.produit.prix_ht;
                const prixTTC = prixHT * 1.20;
                const lineHT = prixHT * ligne.qte;
                const lineTTC = prixTTC * ligne.qte;

                totalHT += lineHT;
                totalTTC += lineTTC;

                return {
                    produitId: ligne.produit._id,
                    libelle: ligne.produit.libelle,
                    quantite: ligne.qte,
                    prixUnitaireHT: prixHT,
                    prixUnitaireTTC: prixTTC,
                    totalHT: lineHT,
                    totalTTC: lineTTC
                };
            });

            return {
                commandeId: commande._id,
                date: commande.date,
                lignes: lignes,
                totalHT: totalHT,
                totalTTC: totalTTC
            };
        });

        res.status(200).send({
            clientId: clientId,
            orders: orderDetails
        });
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving client order details",
            error: err.message
        });
    }
};