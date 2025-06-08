import React, { useState } from 'react';
import { db } from './firebase';
import { ref, push } from 'firebase/database';

export default function TaskForm({ user }) {
  const [text, setText] = useState('');

  const addTask = () => {
  if (!user || !user.uid) {
    alert("Kullanıcı giriş yapmamış. Veri yazılamaz.");
    return;
  }

  if (text.trim()) {
    const taskRef = ref(db, `tasks/${user.uid}`);
    console.log("Veri şu yola yazılıyor:", `tasks/${user.uid}`);
    
    push(taskRef, {
      text,
      completed: false,
      timestamp: Date.now()
    }).then(() => {
      console.log("✅ Görev Firebase'e yazıldı");
    }).catch((error) => {
      console.error("❌ Firebase'e yazılamadı:", error);
    });

    setText('');
  }


  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}
