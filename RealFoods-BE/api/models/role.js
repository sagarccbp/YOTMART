
const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Role',roleSchema);