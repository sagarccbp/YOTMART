const mongoose = require('mongoose');

const UserDiet = mongoose.Schema({
    
}, {timestamps:true});

module.exports = mongoose.model('UserDiet',UserDiet);