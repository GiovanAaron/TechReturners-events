import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import HeaderNavBar from './components/header-nav-bar/HeaderNavBar';

const App: React.FC = () => {
  console.log("App component re-rendered");

  return (
    <Router>
      <HeaderNavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;