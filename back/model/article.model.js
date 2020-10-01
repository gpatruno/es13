const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, unique: true, required: true},
    text: { type: String },
    date_upload: { type: Date },  //Date de mise en ligne
    time_upload: { type: String },  //Date de mise en ligne
    categorie: { type: String }, // Sortie / Evenement / Voyage
    like: { type: Number, default: 0},
    dislike: { type: Number, default: 0 },
    comments: [{ 
        text: { type: String, require: true }, //Texte
        date: { type: Date, required: true }, //Date d'envoie
        senderID: { type: String, require: true } //Id de l'user qui aa evnoeyr le message
    }], //Message envoyé entre les parties
});

module.exports = mongoose.model('Article', articleSchema);