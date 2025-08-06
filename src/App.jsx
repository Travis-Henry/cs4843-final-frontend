import './App.css'
import TaskBoard from './components/TaskBoard'
import AddTaskButton from './components/AddTaskButton'
import AuthForm from './components/AuthForm'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const BACKEND_URL = 'https://backend-mthk.onrender.com';

function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  //login states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  //check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      loadTasks();
    }
  }, []);

  //setup headers
  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  //load tasks from database
  const loadTasks = () => {
    fetch(`${BACKEND_URL}/tasks`, {
      headers: getHeaders()
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to load tasks:", err));
  };

  //handle login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    loadTasks();
  }

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setTasks([]);
  }

  //add tast to database
  const addTask = (taskText) => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ title: taskText })
    })
      .then(res => res.json())
      .then(data => {
        const newTask = {
          _id: data._id,
          title: taskText,
          completed: false
        };
        setTasks([...tasks, newTask]);
        setIsAddingTask(false);
      })
      .catch(err => console.error("Failed to add task:", err));
  };


  //edit task in database
  const editTask = (taskId, newText) => {
    fetch(`${BACKEND_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ title: newText })
    })
      .then(() => {
        setTasks(tasks.map(task => task._id === taskId ? { ...task, title: newText } : task));
        setSelectedTaskId(null);
      })
      .catch(err => console.error("Failed to edit task:", err));
  };


  //delete task from database
  const deleteTask = (taskId) => {
    fetch(`${BACKEND_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
        setSelectedTaskId(null);
      })
      .catch(err => console.error("Failed to delete task:", err));
  };


  //edit complete in database
  const toggleComplete = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`${BACKEND_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ completed: updatedTask.completed })
    })
      .then(() => {
        setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
      })
      .catch(err => console.error("Failed to toggle complete:", err));
  };


  return (
    <div className='app-container'> 
      {isLoggedIn ? (
        <>
          <div className="header">
          <h1>Task Tracker</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
          <TaskBoard 
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
            isAddingTask={isAddingTask}
            setIsAddingTask={setIsAddingTask}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleComplete}
          />
          <AddTaskButton 
            isAddingTask={isAddingTask}
            setIsAddingTask={setIsAddingTask}
          />
        </>
      ):
      (
        <AuthForm handleLogin={handleLogin} BACKEND_URL={BACKEND_URL}/>
      )}
    </div>
  )
}

export default App