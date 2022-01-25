const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    buyAt: {
        type: String,
        required: true
    },
}, { collection: 'purchases' });

module.exports = mongoose.model('Purchase', purchaseSchema);