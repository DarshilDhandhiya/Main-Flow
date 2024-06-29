import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = () => {
    if (!editedTitle.trim()) {
      alert('Please enter a title for the task.');
      return;
    }
    updateTask({ ...task, title: editedTitle, description: editedDescription, completed });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
          <div>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="task-details">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
