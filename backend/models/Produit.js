const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    libelle: { type: String, required: true },
    prix_ht: { type: Number, required: true },
    prix_ttc: { type: Number }, // Ajouté proprement dans le schéma
});

// Middleware pour calculer automatiquement le prix TTC avant sauvegarde
produitSchema.pre('save', function(next) {
    this.prix_ttc = this.prix_ht * 1.20;
    next();
});

module.exports = mongoose.model('Produit', produitSchema);
