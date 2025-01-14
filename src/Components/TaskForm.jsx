import React, { useState } from 'react'

const TaskForm = ({fetchTasks}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [successMsg, setSuccessMsg] = useState();

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (taskData) => {
        try {
            let token = localStorage.getItem('token');
            const response = await fetch('https://task-management-backend-xz3t.onrender.com/task/createTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass token here
                },
                body: JSON.stringify(taskData),
                credentials: 'include',
            });
            const errorData = await response.json(); // Parse the error message
            console.log(errorData);
            setSuccessMsg(errorData.msg);
            if(response.ok) {
                setFormData({
                    title: "",
                    description: ""
                });
                fetchTasks()
            }

        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
  return (
    <div className='task-block'>
        <form className='task-form' onSubmit={(e) => {
                e.preventDefault()
                console.log(formData);
                handleSubmit(formData);
            }}>
                <input value={formData.title} onChange={(event) => { changeHandler("title", event.target.value) }} type='text' placeholder='Title' required/>
                <input value={formData.description} onChange={(event) => { changeHandler("description", event.target.value) }} type="text" placeholder='Description' required/>
                <input className='click-btn' type="submit" value="Create" />
        </form>
        <h3 className='task-msg'>{successMsg}</h3>
    </div>
  )
}

export default TaskForm