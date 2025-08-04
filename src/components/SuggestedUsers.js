import { useEffect, useState } from 'react';
import apiFetch from '../api/Api';
import '../SuggestedUsers.css';

export default function SuggestedUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching suggested users...');
    apiFetch('/users')
      .then(res => {
        console.log('Fetched users:', res);
        setUsers(res.result || []);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const followUser = (userId) => {
    console.log('Trying to follow user with ID:', userId);
    apiFetch(`/users/follow/${userId}`, { method: 'POST' })
      .then(() => {
        console.log('Followed user successfully:', userId);
        setUsers(prev => prev.filter(u => u._id !== userId));
      })
      .catch(err => {
        console.error('Error following user:', err);
      });
  };

  return (
    <div className="suggested-users">
      <h4>Suggested for you</h4>
      {users.slice(0, 5).map(user => (
        <div className="suggested-user" key={user._id}>
          <div className="user-info">
            <span className="username">{user.name}</span>
          </div>
          <button onClick={() => followUser(user._id)} className="follow-btn">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
