const Client = require('../models/Client');
const Commande = require('../models/Commande');

// Create a new client
exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send(client);
    } catch (err) {
        res.status(400).send({
            message: "Error creating client",
            error: err.message
        });
    }
};

// Get all clients
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).send(clients);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving clients",
            error: err.message
        });
    }
};

// Get a specific client by ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).send({ message: "Client not found" });
        }
        res.status(200).send(client);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving client",
            error: err.message
        });
    }
};

// Update a client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!client) {
            return res.status(404).send({ message: "Client not found" });
        }

        res.status(200).send(client);
    } catch (err) {
        res.status(400).send({
            message: "Error updating client",
            error: err.message
        });
    }
};

// Delete a client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);

        if (!client) {
            return res.status(404).send({ message: "Client not found" });
        }

        res.status(200).send({ message: "Client deleted successfully" });
    } catch (err) {
        res.status(500).send({
            message: "Error deleting client",
            error: err.message
        });
    }
};

// Get all orders for a specific client
exports.getClientOrders = async (req, res) => {
    try {
        const commandes = await Commande.find({ client: req.params.id })
            .populate('lignesCmd.produit');

        res.status(200).send(commandes);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving client orders",
            error: err.message
        });
    }
};