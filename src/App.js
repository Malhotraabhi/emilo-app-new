import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      {!token ? (
        <AuthModal setToken={setToken} />
      ) : (
        <Routes>
          <Route path="/" element={<Feed setToken={setToken} />} />
          <Route path="/feed" element={<Feed setToken={setToken} />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
