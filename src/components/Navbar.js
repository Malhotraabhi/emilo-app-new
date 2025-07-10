import { useNavigate } from 'react-router-dom';

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  return (
    <nav style={navStyle}>
      <div style={leftSection}>
        <span style={logo}>Emilo</span>
      </div>
      <div style={rightSection}>
        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
}
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #eee',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  position: 'sticky',
  top: 0,
  zIndex: 999,
};

const logo = {
  fontSize: '1.6rem',
  fontWeight: '600',
  color: '#007bff',
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
};

const leftSection = {
  display: 'flex',
  alignItems: 'center',
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
};

const logoutButton = {
  padding: '8px 16px',
  border: '1px solid #ff4d4f',
  backgroundColor: '#ff4d4f',
  color: '#fff',
  borderRadius: '6px',
  fontWeight: 500,
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

logoutButton[':hover'] = {
  backgroundColor: '#d9363e',
  borderColor: '#d9363e',
};
