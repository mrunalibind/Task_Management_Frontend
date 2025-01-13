import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import "./Home.css"

const Home = ({onLogin}) => {
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const toggleView = () => {
        setIsLoginVisible(!isLoginVisible);
    };
  return (
    <div>
        {isLoginVisible ?
            (
                <div className='user-form'>
                    <Login onLogin={onLogin}/>
                    <p>
                        Don't have an account?{' '}
                        <button onClick={toggleView}>Register</button>
                    </p>  
                </div>
            ):
            (
                <div className='user-form'>
                   <Register />
                    <p>
                        Already have an account?{' '}
                        <button onClick={toggleView}>Login</button>
                    </p> 
                </div>
            )
        }
    </div>
  )
}

export default Home