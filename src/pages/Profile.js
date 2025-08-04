import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiFetch from '../api/Api';
import PostCard from '../components/PostCard';
import '../Profile.css';

export default function Profile() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const fallbackId = localStorage.getItem('userId');
  const id = paramId || fallbackId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (!id) {
      setError('Unable to load profile. Please log in again.');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await apiFetch(`/users/${id}`);
        const userData = userRes.result;
        // console.log(userData);
        
        setUser(userData);
        setIsFollowing(userData?.followers?.some(f => f._id === fallbackId || f === fallbackId));
        setFollowers(userData?.followers || []);
        setFollowing(userData?.following || []);

        const postRes = await apiFetch(`/posts/user/${id}`);
        const postsData = postRes?.result || postRes;
        setPosts(postsData);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to load profile.');
      }
    };

    fetchData();
  }, [id, fallbackId]);

  const toggleFollow = async () => {
    try {
      await apiFetch(`/users/${id}/${isFollowing ? 'unfollow' : 'follow'}`, {
        method: 'POST',
      });
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Follow/unfollow error:', err);
    }
  };

  if (error) {
    return <p style={{ color: 'crimson', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="profile-header">
        <div className="profile-avatar">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          {user?._id !== fallbackId && (
            <button
              className={`follow-button ${isFollowing ? 'unfollow' : ''}`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          Posts ({posts.length})
        </button>
        <button
          className={activeTab === 'followers' ? 'active' : ''}
          onClick={() => setActiveTab('followers')}
        >
          Followers ({followers.length})
        </button>
        <button
          className={activeTab === 'following' ? 'active' : ''}
          onClick={() => setActiveTab('following')}
        >
          Following ({following.length})
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post._id} post={post} onRefresh={() => {}} />
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        )}

        {activeTab === 'followers' && (
          <div className="followers-list">
            {followers.length > 0 ? (
              followers.map(user =>
                typeof user === 'object' ? (
                  <div key={user._id} className="user-badge">
                    {user.name} ({user.email})
                  </div>
                ) : (
                  <div key={user} className="user-badge">{user}</div>
                )
              )
            ) : (
              <p>No followers yet.</p>
            )}
          </div>
        )}

        {activeTab === 'following' && (
          <div className="following-list">
            {following.length > 0 ? (
              following.map(user =>
                typeof user === 'object' ? (
                  <div key={user._id} className="user-badge">
                    {user.name} ({user.email})
                  </div>
                ) : (
                  <div key={user} className="user-badge">{user}</div>
                )
              )
            ) : (
              <p>Not following anyone yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
