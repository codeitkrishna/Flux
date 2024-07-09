import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import '../App.css'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () =>{
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Flux - Track your money</h1>
                </Link>
                <nav>
                    {(user && <div>
                        <span>{user.user.firstname}</span>
                        <button onClick={handleClick}>Log Out</button>
                        <Link to="/sharedExpense">Shared Expense</Link>
                    </div>)}
                    {(!user && <div>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>LogIn</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar