const express = require('express')
const {addTransaction, getTransactions} = require('../controllers/transactionsController')
const requireAuth = require('../middleware/requireAuth');


const transactionRoutes = express.Router();

transactionRoutes.use(requireAuth);

transactionRoutes.get('/getTransactions', getTransactions);
transactionRoutes.post('/addTransaction', addTransaction);

module.exports = transactionRoutes