import React, {useContext, useState, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import HeaderNavBar from './components/header-nav-bar/HeaderNavBar';
import EventbyID from './pages/EventbyID';
import SignIn from './pages/SignIn';
import CreateEvent from './pages/CreateEvent';

export const loginContext = createContext(null);

const App: React.FC = () => {
  console.log("App component re-rendered");

  const [userState, setUserState] = useState({
    isAuthenticated: false, 
    access_type: null
  });



  return (
    <loginContext.Provider value={[userState, setUserState]}>
      <Router>
        <HeaderNavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:eventId" element={<EventbyID />}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </Router>
    </loginContext.Provider>
  );
};

export default App;