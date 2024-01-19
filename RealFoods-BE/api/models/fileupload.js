

const mongoose = require('mongoose');

const FileUpload = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    layoutType : {
        type : String
    },
    name: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('fileUpload',FileUpload);