import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    console.log("🔵 Login butonuna basıldı!");
    
    if (!email || !password) {
      setError("Email ve şifre boş olamaz.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("✅ Giriş başarılı:", userCred.user);
        setError('');
      })
      .catch((err) => {
        console.error("❌ Giriş Hatası:", err);
        setError("Giriş başarısız: " + err.message);
      });
  };

  const register = () => {
    if (!email || !password) {
      setError("Email ve şifre boş olamaz.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("✅ Kayıt başarılı:", userCred.user);
        setError('');
      })
      .catch((err) => {
        console.error("❌ Kayıt Hatası:", err);
        setError("Kayıt başarısız: " + err.message);
      });
  };

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
