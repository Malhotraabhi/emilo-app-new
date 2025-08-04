import { useState } from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';
import '../AuthModal.css'; 

export default function AuthModal({ setToken }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin
          ? <Login setToken={setToken} />
          : <Register switchToLogin={() => setIsLogin(true)} />
        }

        <p className="auth-switch-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="auth-switch-btn">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
