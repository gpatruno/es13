const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String },
    size: { type: String },
    date: { type: Date}
});

mongoose.model('Image', imageSchema);