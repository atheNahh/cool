import React, {Component} from 'react';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Getword from './components/getword';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/play" element={<Getword/>} />
      </Routes>
    </div>
  );
}

export default App;
