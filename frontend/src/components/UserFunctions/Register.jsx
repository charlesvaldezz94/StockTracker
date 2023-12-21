import React, { useState } from "react";
import { auth } from "../../auth/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    <div>
      <h2>Register</h2>
      {registrationSuccess && (
        <p style={{ color: "green" }}>Registration successful! Welcome!</p>
      )}
      {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
      <form onSubmit={handleRegistration}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
