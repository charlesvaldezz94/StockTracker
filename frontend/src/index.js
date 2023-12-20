import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <Main />
  </Router>
);
