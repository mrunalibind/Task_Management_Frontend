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
            const response = await fetch(`http://localhost:6080/task/updateTask?taskID=${task._id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
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