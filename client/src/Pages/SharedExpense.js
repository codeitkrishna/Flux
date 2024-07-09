import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";


const SharedExpense = () => {
    const [userSearch, setUserSearch] = useState('');
    const {user} = useAuthContext();
    const [searchResults, setSearchResults] = useState('');
    const [submittedUserSearch, setSubmittedUserSearch] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setUserSearch(e.target.value)
    };

    const handleSearch = () => {
        setSubmittedUserSearch(userSearch);
    };

    useEffect(() => {

        const searchUsers = async() => {
            if (!submittedUserSearch) {
                setSearchResults(null);
                return;
            }
            try {
                
                const response = await fetch('/api/sharedExpenseRoutes/search-user',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({submittedUserSearch})
                })

                if (!response.ok) {
                    throw new Error('User not found');
                }

                const json = await response.json()
                console.log(response)
                console.log('response from searchUsers api', json) 

                if (json.recipient && json.recipient.length > 0) {
                    const recipient = json.recipient[0];
                    setSearchResults({
                        username: recipient.username,
                        email: recipient.email
                    });
                    setError('');
                } else {
                    throw new Error('User not found');
                }
            }catch(error){
                console.log('error in searchUsers api: ', error);
                setError(error.message);
                setSearchResults(null);
            }
        }

        if(user && submittedUserSearch){
            searchUsers();   
        }

    }, [user, submittedUserSearch]);

    const handleAddFriend = async() => {
        try {
            const response = await fetch('/api/sharedExpenseRoutes/sendreq',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user.user._id,
                    userSearch: searchResults.username
                })
            });

            const addFriendMessage = await response.json();
            if (!response.ok) {
                throw new Error(addFriendMessage.error);
            }
            setSuccessMessage(addFriendMessage)
            setError('')

        } catch (error) {
            console.log('error in addFriend api: ', error);
            setError(error.message);
            setSuccessMessage('')
        }
    }


    return (
        <div className = "sharedExpense-main">

            <input 
                type="text" 
                value={userSearch} 
                onChange={handleChange} 
                placeholder="Enter username"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage.message}</p>}
            {searchResults && (
                <div>
                    <p>Username: {searchResults.username}</p>
                    <p>Email: {searchResults.email}</p>
                    <button onClick={handleAddFriend}>Add Friend</button>
                </div>
            )}
        </div>
    )
};

export default SharedExpense;