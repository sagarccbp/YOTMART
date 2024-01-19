
const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    name: {
        type: String,
        trime: true,
        unique: true,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true});

module.exports = mongoose.model('Disease',diseaseSchema);