const Transaction = require("../models/Transaction");
const User = require ("../models/User");

const getTransactions = async(req, res) => {
    try{
        console.log('getTransactions called');

        // console.log(req.user._id)
        const userId = req.user._id

        // console.log('User ID:', userId);
        const transactions = await Transaction.find({userId})
        
  
        // console.log('reached getdata function')
        // console.log('Transactions retrieved:', transactions);

        return res.status(200).json(transactions)
        //pending - get user's current balance everytime
    }catch(error){
        console.log('error in get transactions',error)
        return res.status(500).json({error: "Couldn't execute the operation. Please try again!"})
    }
}

const addTransaction = async(req, res) => {
    try {
        console.log(req); 
        const userId = req.user._id;
        const {title, date, amount, type, category, description} = req.body;

        let emptyFields = []

        if(!title) {
            emptyFields.push('title')
        }
        if(!date) {
            emptyFields.push('date')
        }
        if(!amount) {
            emptyFields.push('amount')
        }
        if(!type) {
            emptyFields.push('type')
        }
        if(!category) {
            emptyFields.push('category')
        }
        if(emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
        }

        const expenseTransaction = await Transaction.create(
            {userId,
            title,
            date,
            amount,
            type,
            category,
            description}
        )

        const user = await User.findById(userId);
        user.currentbalance += (type === 'income' ? amount : -amount);
        await user.save();

        res.status(200).json(expenseTransaction);

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Couldn't execute the operation. Please try again!"})
    }
    console.log('reached addExpense function')
} 



module.exports = {addTransaction, getTransactions};
