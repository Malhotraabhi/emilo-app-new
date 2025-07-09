import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts/feed')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Feed</h2>
     {posts.map(post => (
  <div key={post._id} style={{
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)'
  }}>
    <p>{post.content}</p>
    {post.file && <img src={post.file} alt="post" />}
  </div>
))}
    </div>
  );
}
