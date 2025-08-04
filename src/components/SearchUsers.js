import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../api/Api';
import '../SearchUsers.css';

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        apiFetch(`/users?search=${query}`)
          .then((data) => {
            const users = Array.isArray(data?.result) ? data.result : [];
            setResults(users);
          })
          .catch((err) => {
            console.error('Search error:', err);
            setResults([]);
          })
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const openProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="search-container">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="search-input"
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : results.length > 0 ? (
        <ul className="user-list">
          {results.map((user) => (
            <li
              key={user._id}
              className="user-item"
              onClick={() => openProfile(user._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="avatar-placeholder">{user.name[0].toUpperCase()}</div>
              <div style={{marginLeft:'12px'}}>
                <p className="user-name">{user.name}</p>
                {user.email && <p className="user-email">{user.email}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        query.trim() && <p className="no-results">No users found.</p>
      )}
    </div>
  );
}
