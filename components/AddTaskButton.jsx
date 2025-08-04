import React from 'react'

function AddTaskButton({isAddingTask, setIsAddingTask}) {

    const handleClick = () => {
        if(isAddingTask){
            setIsAddingTask(false);
        }else{
            setIsAddingTask(true);
        }
    }



  return (
    <button 
        onClick={handleClick}
        className={`add-task-btn ${isAddingTask ? 'add-task-btn--cancel' : ''}`}
    >
        {isAddingTask ? 'Cancel' : 'Add New Task'}
    </button>
  )
}

export default AddTaskButton