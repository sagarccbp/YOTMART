
const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender: {
        type : mongoose.Types.ObjectId, ref:'User'
    },
    content: {
        type : String,trim: true
    },
    chat: {
        type : mongoose.Types.ObjectId, ref:'Chat'
    },
    file: {
        type: String,trim: true
    },
    isSeen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Message',messageModel);