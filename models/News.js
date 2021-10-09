const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({

    headline: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = News = mongoose.model('News', newsSchema)