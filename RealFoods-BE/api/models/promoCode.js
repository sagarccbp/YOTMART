
const mongoose = require('mongoose');

const promoCodesSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    code: { type: String, require: true, unique: true },
    percent: { type: Number, required: true, min : 1, max: 100 },
    expireDate: { type: Date, require: true },
    isActive: { type: Boolean, require: true, default: true },
    
},{timestamps : true}
);

module.exports = mongoose.model('promoCode',promoCodesSchema);