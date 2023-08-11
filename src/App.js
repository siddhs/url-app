import React from 'react';
import './App.css';
import Home from './Home';
import URLList from './URLList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/stats" element={<URLList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
