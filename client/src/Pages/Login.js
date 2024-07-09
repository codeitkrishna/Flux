import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()


    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(username, password)
        await login(username, password)
    }
    return (
        <form className='login' onSubmit={handleSubmit}>
            <h2> Login User </h2>

            <label>Enter User Name: </label>
            <input type='text' onChange={(e)=>setUsername(e.target.value)}/>

            <label>Password: </label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)}/>
            

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
} 
export default Login;