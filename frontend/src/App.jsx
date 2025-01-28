import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
