import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "./Task.css";
import TaskForm from "./TaskForm";
import EditModel from "./EditModel";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); 

  const fetchTasks = async (currentPage) => {
    
    try {
      let token = localStorage.getItem('token');
      
      const response = await fetch(`https://task-management-backend-xz3t.onrender.com/task/retrieveTask?page=${currentPage}&perPage=10`, {
        method: 'GET',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Pass token here
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data.tasks.docs);
        setTasks(data.tasks.docs); // `docs` from the `mongoose-paginate-v2` response
        setTotalPages(data.tasks.totalPages);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const loggedInUserId = localStorage.getItem('userID');
  
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  return (
    <div className={`task-page ${showModal ? "blur-background" : ""}`}>
      <br />
      <TaskForm fetchTasks={fetchTasks}/>
      <h3 className="teamName">Task Lists of {tasks[0]?.team}</h3>
      
        <div className="card">
          {tasks.map((task) => (
            <TaskCard fetchTasks={fetchTasks} key={task.id} prop={task} loggedInUserId={loggedInUserId} onEdit={() => handleEdit(task)}/>
          ))}
          
        </div>
      
      <div className="btn-block">
        <div>
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <EditModel task={taskToEdit} onClose={handleCloseModal} fetchTasks={fetchTasks}/>
      )}

    </div>
  );
};

export default Task;
