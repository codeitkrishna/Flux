const TransactionDetails = ({ transaction }) => {
    // console.log('RENDERING TRANSACTIONS: ', transaction);
    return (
        <div className = "transaction-details">
            <p><strong>Amount ($): </strong>{transaction.amount}</p>
            <p><strong>Type: </strong>{transaction.type}</p>
        </div>
    )
}

export default TransactionDetails;