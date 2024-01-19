

const mongoose = require('mongoose');

const API_KEY = mongoose.Schema({
    hash: {
        type: String,
        required: true
    }
}, {
  timestamps:true  
})

module.exports = mongoose.model('API_KEY',API_KEY);