const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);