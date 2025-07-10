import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Feed from './pages/Feed';
import AuthModal from './components/AuthModal';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored && !token) setToken(stored);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <AuthModal setToken={setToken} /> : <Navigate to="/feed" />} />
        <Route path="/feed" element={token ? <Feed setToken={setToken} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
} 

export default App;
