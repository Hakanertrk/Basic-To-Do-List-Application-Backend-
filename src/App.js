import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import AuthForm from './AuthForm';
import { ref, onValue } from 'firebase/database';

export default function App() {
  const [user, setUser] = useState(null);

  // 🔁 Kullanıcı login/logout olduğunda tetiklenir
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔄 Oturum değişikliği:", user);
      setUser(user);
    });

    return () => unsubscribe(); // Temizlik
  }, []);

  // 🧪 Test için tüm veritabanını yazdırmak istersen (isteğe bağlı)
  useEffect(() => {
    const testRef = ref(db, '/');
    onValue(testRef, (snapshot) => {
      console.log("📦 Tüm veritabanı:", snapshot.val());
    });
  }, []);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>📋 Smart To-Do List</h1>

      {user ? (
        <>
          <p>👋 Hoş geldin, {user.email}</p>
          <button onClick={() => signOut(auth)} style={{ marginBottom: 20 }}>
            Logout
          </button>
          <TaskForm user={user} />
          <TaskList user={user} />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
