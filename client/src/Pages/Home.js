
import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

import TransactionForm from '../components/TransactionForm'
import TransactionDetails from '../components/TransactionDetails'

//pending - make transactions context null when logout, use dispatch to set paylooad null

const Home = () => {
    // console.log('reached home component')
    const {transactions, dispatch} = useTransactionsContext()
    const {user} = useAuthContext()
    // const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTransactionDetails = async() => {

            try{
            console.log('Fetching transaciton details...')
            const response = await fetch('/api/transactionRoutes/getTransactions',{
                method: 'GET',
                headers: {   
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            // console.log(response)
            // console.log('response from api',json)

            if (response.ok) {
                // console.log('response dispatched',json)
                dispatch({ type: 'SET_TRANSACTIONS', payload: json });
            } else {
                console.error('Failed to fetch transactions:', json);
            }

        }catch(error){
            console.error('error fetching transactions: ', error)
        }
    }

        if(user){
            fetchTransactionDetails()   
        }
    
    }, [dispatch, user])

    // console.log('Transactions in state: ', transactions)

    return(
        <div className="home">
            <div className="transactions">
                {/* {Array.isArray(transactions) && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))} */}
                {Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((transaction) => {
                        // console.log('Rendering each transaction:', transaction);
                        return <TransactionDetails key={transaction._id} transaction={transaction} />
                    })
                ) : (
                    <p>No transactions found</p>
                )}
            </div>
            <TransactionForm />
        </div>
    );
};

export default Home;