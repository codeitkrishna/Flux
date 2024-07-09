import {useState} from 'react'
import { useRegister } from '../hooks/useRegister'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register,isLoading,error} = useRegister()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await register(firstname,lastname,mobilenumber,username,email,password)
    }
    return (
        <form className='register' onSubmit={handleSubmit}>
            <h2> Register User </h2>

            <label>FirstName: </label>
            <input type='text' onChange={(e)=>setFirstname(e.target.value)}/>

            <label>LastName: </label>
            <input type='text' onChange={(e)=>setLastname(e.target.value)}/>

            <label>Contact Number: </label>
            <input type='number' onChange={(e)=>setMobilenumber(e.target.value)}/>

            <label>Set User Name: </label>
            <input type='text' onChange={(e)=>setUsername(e.target.value)}/>

            <label>Email: </label>
            <input type='email' onChange={(e)=>setEmail(e.target.value)}/>

            <label>Password: </label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)}/>

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
} 
export default Register