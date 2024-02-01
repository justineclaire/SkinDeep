import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Model from './pages/model';
import Home from './pages/home';
import Quiz from './pages/quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/model" element={<Model />} />
        <Route exact path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;