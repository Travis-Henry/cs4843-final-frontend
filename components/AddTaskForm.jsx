import React from 'react'
import { useState } from 'react';

function AddTaskForm({onAddTask, onCancel}) {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(taskText.trim()){
            onAddTask(taskText.trim());
            setTaskText('');
        }
    };

    const handleCancel = () => {
        setTaskText('');
        onCancel();
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleSubmit(e);
        }else if(e.key === 'Escape'){
            handleCancel();
        }
    }



  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter new task..."
        className="add-task-input"
        autoFocus
        maxLength={500} // Reasonable limit
      />
      <div className="add-task-buttons">
        <button 
          type="submit" 
          className="save-btn"
          disabled={!taskText.trim()}
        >
          Add Task
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddTaskForm