
const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    image: {
        x_l_large: {
                     url: {
                        type: String
                    }
                },
        l_large: {
            url: {
                type: String
            }
        },
        l_medium: {
            url: {
                type: String
            }
        },
        l_small: {
            url: {
                type: String
            }
        },
        x_sm: {
                     url: {
                        type: String
                    }
                }
    },
    tags: {
        type:[String]
    },
    description:String,
    smallDescription:String,
    theme:String,
    categories: {
        type:[mongoose.Types.ObjectId],ref:'Categories'
    },
    ownerId : {
        type : mongoose.Types.ObjectId, ref:"User",
        required: true
    },
    collectionName: {
        type: String,
        default:'SubCategories'
    }
}, {timestamps: true});

module.exports = mongoose.model('SubCategories',subCategorySchema);