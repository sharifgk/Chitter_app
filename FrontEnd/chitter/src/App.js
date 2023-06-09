import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation.jsx';
import LoginForm from './Components/LoginForm.jsx';
import SignUpForm from './Components/SignUpForm.jsx';
import PeepForm from './Components/PeepForm.jsx';
import PeepList from './Components/PeepList.jsx';
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [peepListKey, setPeepListKey] = useState(0);

  const refreshPeepList = useCallback(() => {
    setPeepListKey(prevKey => prevKey + 1);
  }, []);

  const updateLogInStatus = () => {
    setLoggedIn(!!localStorage.getItem('token'));
    }

  useEffect(() => {
    updateLogInStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

   return (
    <Router>
      <Navigation loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <div className="container">
             <h2>Welcome to Chitter!</h2>
             <PeepList key={peepListKey}/>
            {loggedIn && <PeepForm onPeepCreated={refreshPeepList} />}
          </div>
        } />
         <Route path="/login" element={<LoginForm onLogin={updateLogInStatus} />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
