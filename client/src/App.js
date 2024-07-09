import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import SharedExpense from './Pages/SharedExpense'



export default function App() {
  const {user} = useAuthContext();
  console.log('this is the current logged in user: ', user)
  
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <div className="pages">
    <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to= "/login"/>} />
        <Route path="/register" element={!user ? <Register />: <Navigate to='/'/>} />
        <Route path="/login" element={!user ? <Login />: <Navigate to='/'/>} />
        <Route path="/sharedExpense" element={user ? <SharedExpense />: <Navigate to='/login'/>} />
    </Routes>
    </div>
  </BrowserRouter>
    </div>
  );
}
