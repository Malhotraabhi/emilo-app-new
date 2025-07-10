import { useState } from 'react';
import apiFetch from '../api/Api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setType('');

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/feed');
      } else {
        setType('error');
        setMessage(data?.message || 'Login failed');
      }
    } catch {
      setType('error');
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {message && (
        <p style={{ marginTop: '15px', color: type === 'success' ? 'green' : 'crimson' }}>
          {message}
        </p>
      )}
    </form>
  );
}
