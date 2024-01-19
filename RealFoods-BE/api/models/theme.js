

const mongoose = require('mongoose');

const themeSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Themes',themeSchema);