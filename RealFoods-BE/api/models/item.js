
const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
    ownerId : {
        type : mongoose.Types.ObjectId, ref:"User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: [
            {
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
            }
        ],
    tags: {
        type:[String]
    },
    description:String,
    smallDescription:String,
    theme:String,
    price: {
        type:Number
    },
    discount : {
        type: Number,
        default: 0
    },
    categories: {
        type:[mongoose.Schema.Types.ObjectId],ref:"Categories"
    },
    subCategories : {
        type:[mongoose.Schema.Types.ObjectId],ref:"SubCategories"
    },
    presentStock : {
        type : Number,
        required : true
    },
    reviews : {
       type:[mongoose.Schema.Types.ObjectId],ref:"review"
    },
    shippingInfo: {
        type : String
    },
    returnNotes: {
        type : String
    },
    unit: {
        type: String,
        enum : ['litre','Mili Litre','Kg','Mg','Grams','pounds']
    },
    minimumOrderQuantity: {
        type: Number,
        required: false
    },
    stepUpValue: {
        type: Number,
        required: false
    },
    shippingCharges: {
        type: Number,
        required: false,
        default:0
    },
    varients: {
        type: [mongoose.Schema.Types.ObjectId],ref:"itemVarient"
    },
    collectionName: {
        type: String,
        default:'items'
    }
},{timestamps: true});

module.exports = mongoose.model('items',itemsSchema);