import React, { useState } from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
            email: "",
            password: ""
        });
        const [successMsg, setSuccessMsg] = useState();

        const navigate = useNavigate();

        const changeHandler = (key, value) => {
            setFormData({ ...formData, [key]: value })
        }

        const handleSubmit = async (userData) => {
            try {
                console.log(userData);
                const response = await fetch('http://localhost:6080/user/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData),
                    credentials: 'include',
                });
                const errorData = await response.json(); // Parse the error message
                setSuccessMsg(errorData.msg);
                if(response.ok) {
                    setFormData({
                        email: "",
                        password: ""
                    });
                    localStorage.setItem('userID', errorData.userID);
                    onLogin();
                    navigate('/tasks')
                }
    
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }

  return (
    <div className='form-box'>
        <h4 className='msg'>{successMsg}</h4>
        <form className='form-block' onSubmit={(e) => {
                e.preventDefault()
                console.log(formData);
                handleSubmit(formData);
            }}>
                <input value={formData.email} onChange={(event) => { changeHandler("email", event.target.value) }} type='email' placeholder='Email' required/>
                <input value={formData.password} onChange={(event) => { changeHandler("password", event.target.value) }} type="password" placeholder='Password' required/>
                <input className='click-btn' type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login