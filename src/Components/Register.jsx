import React, { useState } from 'react'
import "./Home.css"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        team: "",
        role: "",
        email: "",
        password: ""
    });
    const [successMsg, setSuccessMsg] = useState();

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (userData) => {
        try {
            console.log(userData);
            const response = await fetch('https://task-management-backend-xz3t.onrender.com/user/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const errorData = await response.json(); // Parse the error message
            setSuccessMsg(errorData.msg);

            if(response.ok){
                setFormData({
                    name: "",
                    team: "",
                    role: "",
                    email: "",
                    password: ""
                });
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
                // console.log(formData);
                handleSubmit(formData);
            }}>
                <input value={formData.name} onChange={(event) => { changeHandler("name", event.target.value) }} type="text" placeholder='Name' required/>
                <input value={formData.team} onChange={(event) => { changeHandler("team", event.target.value) }} type="text" placeholder='Team' required/>
                <input value={formData.role} onChange={(event) => { changeHandler("role", event.target.value) }} type="text" placeholder='Role'/>
                <input value={formData.email} onChange={(event) => { changeHandler("email", event.target.value) }} type='email' placeholder='Email' required/>
                <input value={formData.password} onChange={(event) => { changeHandler("password", event.target.value) }} type="password" placeholder='Password' required/>
                <input className='click-btn' type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register