import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import './App.css'
import Logout from './Components/Logout';
import Notification from './Components/Notification';
import Task from './Components/Task';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);  // After successful login

  };
  return (
    <>
        <BrowserRouter>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path='/' element={<Home onLogin={handleLogin}/>}/>
              
                <Route path='/tasks' element={<Task/>}/>
                <Route path='/notifications' element={<Notification/>}/>
                <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn}/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App