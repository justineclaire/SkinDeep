import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Model from './pages/model';
import Home from './pages/home';
import Quiz from './components/quiz';
import Profile from './pages/profile';
import Info from './pages/info';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/model" element={<Model />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/info/:id/:name/:info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;