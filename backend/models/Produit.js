const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    libelle: { type: String, required: true },
    pu: { type: Number, required: true },
});

module.exports = mongoose.model('Produit', produitSchema);