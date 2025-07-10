import { useState } from 'react';
import apiFetch from '../api/Api';

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setType('');

    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (data.success || data.token) {
        setType('success');
        setMessage('Registered successfully! Redirecting to login...');
        setTimeout(() => switchToLogin(), 1500);
      } else {
        setType('error');
        setMessage(data?.message || 'Registration failed');
      }
    } catch {
      setType('error');
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
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
      <button type="submit">Register</button>
      {message && (
        <p style={{ marginTop: '15px', color: type === 'success' ? 'green' : 'crimson' }}>
          {message}
        </p>
      )}
    </form>
  );
}
