import React, { useState, useEffect } from 'react';
import { auth } from '../../auth/firebase/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setSuccessMessage(`Hello ${user.email}, you are already logged in!`);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setSuccessMessage('Login successful! ' + `Welcome user: ${email}`);

      // Navigate to the home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Login error:', error.message);
      setSuccessMessage('');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setSuccessMessage('Logout successful!');
    } catch (error) {
      console.error('Logout error:', error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
