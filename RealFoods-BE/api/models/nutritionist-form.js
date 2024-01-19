

const mongoose = require('mongoose');

const nutritionistFormSchema = mongoose.Schema({
    name: {
        type: String,
        trime: true,
        unique: true,
        required:true
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Question"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true});

module.exports = mongoose.model('NutritionForm',nutritionistFormSchema);