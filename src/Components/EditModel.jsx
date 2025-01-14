import React, { useState } from 'react'
import "./EditModel.css"

const EditModel = ({task, onClose, fetchTasks}) => {
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description
    });
    const [responseMsg, setresponseMsg] = useState()
    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }
    const handleSubmit = async() => {
        try {
            let token = localStorage.getItem('token');
            const response = await fetch(`https://task-management-backend-xz3t.onrender.com/task/updateTask?taskID=${task._id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Pass token here
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            let data = await response.json();

            setresponseMsg(data.msg);
            if (response.ok) {
                fetchTasks(); // Refresh tasks
                onClose(); // Close modal
            }
            
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>{responseMsg}</h4>
        <h5>Edit Task</h5>
        <form>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => changeHandler("title", e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={formData.description}
            onChange={(e) => changeHandler("description", e.target.value)}
            placeholder="Description"
          />
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditModel