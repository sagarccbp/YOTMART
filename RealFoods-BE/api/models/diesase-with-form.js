


const mongoose = require('mongoose');

const FormWithDiseaseSchema = mongoose.Schema({
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Disease"
    },
    forms: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"NutritionForm"
    }
}, {timestamps:true});

module.exports = mongoose.model('FormWithDisease',FormWithDiseaseSchema);