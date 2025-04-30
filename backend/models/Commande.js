const mongoose = require('mongoose');

const ligneCmdSchema = new mongoose.Schema({
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    qte: { type: Number, required: true },
});

const commandeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    lignesCmd: [ligneCmdSchema], // Embedded array of LigneCmd
});

module.exports = mongoose.model('Commande', commandeSchema);