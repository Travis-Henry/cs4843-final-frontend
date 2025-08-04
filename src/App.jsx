import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskBoard from './components/TaskBoard'
import AddTaskButton from './components/AddTaskButton'

function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  //TODO add http requests
  const addTask = (taskText) => {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed:false
      };
      setTasks([...tasks, newTask]);
      setIsAddingTask(false);
  };

  //TODO add http requests
  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task => {
      task.id === taskId ? {...task, text:newText} : task
    }));
    setSelectedTaskId(null);
  };

  //TODO add http request
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => {task.id !== taskId}));
    setSelectedTaskId(null);
  };

  //TODO add http requests
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div className='app-container'> 
      <h1>Task Tracker</h1>
      <TaskBoard 
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        isAddingTask={isAddingTask}
        onAddTask={addTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
      />
      <AddTaskButton 
        isAddingTask={isAddingTask}
        setIsAddingTask={setIsAddingTask}
      />
    </div>
  )
}

export default App
