import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation.jsx';
import LoginForm from './Components/LoginForm.jsx';
import SignUpForm from './Components/SignUpForm.jsx';
import PeepForm from './Components/PeepForm.jsx';
import PeepList from './Components/PeepList.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path="/" element={<><PeepList /><PeepForm /></>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
