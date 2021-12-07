import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LaunchDetails from './LaunchDetails';
import LaunchList from './LaunchList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchList />} />
        <Route path='/launch/:launchid' element={<LaunchDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
