import { useState } from 'react'

function Task({
    task, 
    isSelected, 
    onSelect, 
    onDeselect, 
    onEdit, 
    onDelete, 
    onToggleComplete 
}){

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);

    const handleClick = () => {
        if(isSelected){
            onDeselect();
        }else{
            onSelect();
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(task.title);
    };

    const handleSaveEdit = () => {
        //if text is different, save
        if(editText.trim() && editText.trim() !== task.title){
            onEdit(task._id, editText.trim());
        }
        setIsEditing(false);
        onDeselect();
    };

    const handleCancelEdit = () => {
        setEditText(task.title);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleSaveEdit();
        }else if(e.key === 'Escape'){
            handleCancelEdit();
        }
    };

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this task?')){
            onDelete(task._id);
        }
    };

    const handleToggleComplete = () => {
        //TODO
    }

    const handleButtonClick = (e, action) => {
        e.stopPropagation();
        action();
    }

    if (isEditing) {
    return (
      <div className="Task Task--editing">
        <div className="task-checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="task-checkbox"
          />
        </div>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="task-edit-input"
          autoFocus
          maxLength={500}
        />
        <div className="task-edit-buttons">
          <button 
            onClick={handleSaveEdit}
            className="task-btn save-btn"
            disabled={!editText.trim()}
          >
            Save
          </button>
          <button 
            onClick={handleCancelEdit}
            className="task-btn cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`Task ${task.completed ? 'Task--completed' : ''} ${isSelected ? 'Task--selected' : ''}`}
      onClick={handleClick}
    >
      <div className="task-checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />
      </div>
      
      <span className="task-text">
        {task.title}
      </span>

      {isSelected && (
        <div className="task-actions">
          <button 
            onClick={(e) => handleButtonClick(e, handleEdit)}
            className="task-btn edit-btn"
          >
            Edit
          </button>
          <button 
            onClick={(e) => handleButtonClick(e, handleDelete)}
            className="task-btn delete-btn"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );


}

export default Task;