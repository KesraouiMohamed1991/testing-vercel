const mongoose = require('mongoose');

// Schéma pour les horaires
const horairesSchema = new mongoose.Schema({
    lundi: String,
    mardi: String,
    mercredi: String,
    jeudi: String,
    vendredi: String,
    samedi: String,
    dimanche: String,
});

// Schéma pour les activités et équipements
const activitesEtEquipementsSchema = new mongoose.Schema({
    Redifusion_des_matchs: Boolean,
    Billard: Boolean,
    Fletchette: Boolean,
    Pétanque: Boolean,
    eSport: Boolean,
    Babyfoot: Boolean,
    Jeux_de_société: Boolean,
    Karaoke: Boolean,
    Danse: Boolean,
    Wifi: Boolean,
});

// Schéma pour les caractéristiques et services
const caracteristiquesEtServicesSchema = new mongoose.Schema({
    Dégustation: Boolean,
    Familial: Boolean,
    Lounge: Boolean,
    Irlandais: Boolean,
    Cocktail: Boolean,
    Plage: Boolean,
    Sportif: Boolean,
    Bar_à_thème: Boolean,
    Rooftop: Boolean,
    Tapas: Boolean,
    Thé: Boolean,
    Afterwork: Boolean,
});

// Schéma pour un bar
const barSchema = new mongoose.Schema({
    name: String,
    map: String,
    note: Number,
    twTruncate4: Number,
    prix: Number,
    type: String,
    presentation: String,
    adresse: String,
    gps: String,
    site: String,
    numero: String,
    image: String,
    longitude: Number,
    latitude: Number,

    // Utilisation des schémas définis pour les sous-documents
    horaires: horairesSchema,
    activitesEtEquipements: activitesEtEquipementsSchema,
    caracteristiquesEtServices: caracteristiquesEtServicesSchema,
});

// Modèle pour un bar
const Bar = mongoose.model('bars', barSchema);

// Schéma pour un article

const articleSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    image: String,
    adresse: String,
    content: String,
});

// Modèle pour un article
const Blog = mongoose.model('blogs', articleSchema);

// Schéma pour un événement
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    image: String,
    adresse: String,
});

// Modèle pour un événement
const Event = mongoose.model('events', eventSchema);

module.exports = { Bar, Blog, Event };
