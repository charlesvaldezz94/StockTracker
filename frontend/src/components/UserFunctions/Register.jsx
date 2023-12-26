import React, { useState } from "react";
import { auth } from "../../auth/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful
      setRegistrationError(null); // Clear any previous error
      setRegistrationSuccess(true); // Set success message
      console.log("User registered successfully!");

      // Clear the form
      setEmail("");
      setPassword("");
    } catch (error) {
      setRegistrationError(error.message);
      setRegistrationSuccess(false); // Set success to false in case of an error
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerTitle">Welcome new user! Please register!</div>
      {registrationSuccess && (
        <p style={{ color: "green" }}>Registration successful! Welcome!</p>
      )}
      {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
      <div className="registerFormContainer">
        <form onSubmit={handleRegistration}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <br />
          <button className='registerBtn' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
