import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    
    const register = async(firstname, lastname, mobilenumber, username, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/router/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({firstname, lastname, mobilenumber, username, email, password})
        })

        const json = await response.json()
        console.log(response)
        console.log(json)

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {register, isLoading,error}
} 