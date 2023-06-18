const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Nome must be present"]
    },
    price:{
        type:Number,
        required:[true,"Price must be present"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.9
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['apple','samsung','dell','mi'],
            message:'Company must be one of the following'
        },
    },
});


module.exports = mongoose.model('Product',productSchema)