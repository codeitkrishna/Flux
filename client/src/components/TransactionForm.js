import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import '../App.css'


const AddTransactionForm = () => {

    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        amount: 'null',
        type: '',
        category: '',
        description: ''
    })

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!user){
            setError('Please login first')
            return
        }

        //use the api endpoint to connect to the server
        const response = await fetch('/api/transactionRoutes/addTransaction', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            
        }
        if(response.ok){
            setFormData({ 
                date: '',
                title: '',
                amount: 'null',
                type: '',
                category: '',
                description: ''
            })
            dispatch({type:'CREATE_TRANSACTIONS', payload: json})
        }
    }

    const incomeCategories = ['Salary', 'Investment', 'Freelancing', 'Other'];
    const expenseCategories = ['Rent', 'Clothes', 'General', 'Electricity Bill', 'Recharge', 'Others'];

    // Determine the categories based on the transaction type
    const categories = formData.type === 'income' ? incomeCategories : expenseCategories;
    

    return(
        <div>
            <div>
                <h2>Add Transaction</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />  
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required/>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="null"> </option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select name="category" value={formData.category} onChange={handleChange} required >
                        <option value="null"> </option>
                        {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>))}
                    </select>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    <button>Add Transaction</button>
                    {error && <div className="error">{error}</div>}
                </form>            
            </div>
        </div>
    );
};

export default AddTransactionForm