import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Mainpage';
import Place from './pages/Place/PlacePage';
import Course from './pages/Course/CoursePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/whereplace" element={<Place />} />
      <Route path="/courseguide" element={<Course />} />
    </Routes>
  );
}

export default App
