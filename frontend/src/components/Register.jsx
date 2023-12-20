import React, { useState } from 'react';
import { auth } from './firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState(null);
  
    const handleRegistration = async (e) => {
      e.preventDefault();
  
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        // If successful
        setRegistrationError(null); // Clear any previous error
        console.log('User registered successfully!');
      } catch (error) {
        setRegistrationError(error.message);
        console.error('Registration error:', error.message);
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
        <form onSubmit={handleRegistration}>
          {/* ... rest of the form */}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

export default Register;
