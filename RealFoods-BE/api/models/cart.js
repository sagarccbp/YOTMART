
const mongoose = require('mongoose');

const cartResponseSchema = mongoose.Schema({
        _id:mongoose.Types.ObjectId,
        userId : {
            type: mongoose.Schema.Types.ObjectId,ref:'User',
            required: true,
        },
        items : [
            {
                _id :  {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "items"
                },
                itemQuantity : {
                    type : Number,
                    default : 0
                },
                varient: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "itemVarient"
                }
            }
        ],  
        quantity : Number,
        totalPrice : {
            type : Number,
            default: 0
        },
        discountedPrice : {
            type : Number,
            default : 0
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model('Cart',cartResponseSchema);