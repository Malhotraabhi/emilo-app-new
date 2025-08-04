import '../Layout.css';

export default function Navbar({ setToken }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Emilo</div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
