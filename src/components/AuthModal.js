import { useState } from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';

export default function AuthModal({ setToken }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin 
          ? <Login setToken={setToken} /> 
          : <Register switchToLogin={() => setIsLogin(true)} />
        }
        <p style={{ marginTop: '20px' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} style={styles.linkButton}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, bottom: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};