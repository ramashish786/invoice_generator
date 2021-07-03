
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String 
    },
    quantity:{
        type: String 
    },
    description:{
        type: String 
    },
    tax:{
        type: Number
    },
    price:{
        type: Number
    }
});

const product = mongoose.model("product",productSchema);

module.exports = product