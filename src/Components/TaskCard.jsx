import React, { useState } from 'react'
import "./Task.css"

const TaskCard = ({prop, fetchTasks, loggedInUserId, onEdit}) => {
    let {_id, title, description, createdAt, userId} = prop;

    console.log(userId, loggedInUserId);
    const isOwnTask = userId === loggedInUserId;
    const handleComplete = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await fetch(`https://task-management-backend-xz3t.onrender.com/task/removeTask?taskID=${_id}`, {
                method: 'DELETE',
                credentials: 'include', // To include cookies with the request
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass token here
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.msg); // Show success message
                fetchTasks() // Notify parent about task removal
            } else {
                alert(data.msg || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Something went wrong. Please try again.');
        }
    };

  return (
    <div className={`${isOwnTask ? "own-task" : "other-task"}`} style={{marginBottom:'20px'}}>
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>CreatedAt: {new Date(createdAt).toLocaleString()}</p>
        </div>
        <div className='btn'>
            <button onClick={onEdit}>Edit</button>
            <button onClick={handleComplete}>Complete</button>
        </div>
    </div>
  )
}

export default TaskCard