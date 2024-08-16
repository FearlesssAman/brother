import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './component/contextreducer';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
