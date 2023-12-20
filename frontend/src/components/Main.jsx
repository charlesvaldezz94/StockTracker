import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Navbar, FindStock, Login, firebaseConfig, Register } from "./";

const Main = () => {
  const apiKey = "R1Q7XP8H7N1WSGMG";

  return (
    <div className="mainContainer">
      <Navbar />  
        <div>
          <Routes>
            <Route exact path="/" element={<Home apiKey={apiKey}/>} />
            <Route path="/stock" element={<FindStock apiKey={apiKey}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    </div>
  );
};

export default Main;
