import React, {Component} from 'react';
import Home from './home';
import Login from './login';
import Register from './register';
import Game from './game';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/hangman" element={<Home/>} />
        <Route path="/hangman/play" element={<Game/>} />
      </Routes>
    </div>
  );
}

export default App;
