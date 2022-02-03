const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    buyAt: {
        type: String,
        required: true
    },
}, { collection: 'purchases' });

module.exports = mongoose.model('Purchase', purchaseSchema);