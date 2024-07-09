const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title:{
        type: String,
        reuired: true
    },
    date: {
        type: Date,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    description:{
        type: String
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);