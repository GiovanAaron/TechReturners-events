import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HeaderNavBar from './components/header-nav-bar/HeaderNavBar';
import EventbyID from './pages/EventbyID';

const App: React.FC = () => {
  console.log("App component re-rendered");

  return (
    <Router>
      <HeaderNavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<EventbyID />}/>
      </Routes>
    </Router>
  );
};

export default App;