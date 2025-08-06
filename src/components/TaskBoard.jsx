import React from 'react'
import AddTaskForm from './AddTaskForm'
import Task from './Task'

function TaskBoard({
  tasks, 
  selectedTaskId, 
  setSelectedTaskId, 
  isAddingTask,
  setIsAddingTask, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleComplete 
}) {

    
  return (
    <div className='TaskBoard'>
       {tasks.map(task => (
        <Task
          key={task._id}
          task={task}
          isSelected={selectedTaskId === task._id}
          onSelect={() => setSelectedTaskId(task._id)}
          onDeselect={() => setSelectedTaskId(null)}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
       {isAddingTask && (
        <AddTaskForm 
          onAddTask={onAddTask}
          onCancel={()=> setIsAddingTask(false)}
        />
       )}
       {tasks.length === 0 && !isAddingTask && (
          <div>No tasks</div>
       )}
    </div>
  )
}

export default TaskBoard