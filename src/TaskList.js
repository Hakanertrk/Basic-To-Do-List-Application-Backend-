import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, onValue, update, remove } from 'firebase/database';

export default function TaskList({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(db, `tasks/${user.uid}`);
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const taskArray = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setTasks(taskArray);
    });
  }, [user.uid]);

  const toggleTask = (id, completed) => {
    update(ref(db, `tasks/${user.uid}/${id}`), { completed: !completed });
  };

  const deleteTask = (id) => {
    remove(ref(db, `tasks/${user.uid}/${id}`));
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            onClick={() => toggleTask(task.id, task.completed)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
