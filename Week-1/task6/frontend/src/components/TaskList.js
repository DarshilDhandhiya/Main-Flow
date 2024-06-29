import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => task._id === updatedTask._id ? response.data : task));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-list">
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
