import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components";
import './auth/firebase/firebase';
import { AuthProvider } from './auth/authContext';

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
