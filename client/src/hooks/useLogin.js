import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();
    
    const login = async(username, password) => {
        try{console.log(username, password)
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/userRoutes/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username, password})
        })

        const json = await response.json();

        console.log(response)
        console.log(json)

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type:'LOGIN', payload: json});
        setIsLoading(false);
    }catch(err){
        console.log(err)
        setError(err.message || 'something wrong')
        setIsLoading(false);
    }

    };

    return {login, isLoading, error}
} 