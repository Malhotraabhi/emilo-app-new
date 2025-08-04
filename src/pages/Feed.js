import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import apiFetch from '../api/Api';
import '../Feed.css';

export default function Feed({ setToken }) {
  const [posts, setPosts] = useState([]);
  const [postTrigger, setPostTrigger] = useState(0);

  const loadFeed = () => {
    apiFetch('/posts/feed')
      .then(res => setPosts(res.result || []))
      .catch(console.error);
  };

  useEffect(() => {
    loadFeed();
  }, [postTrigger]);

  return (
    <Layout setToken={setToken} setPostTrigger={setPostTrigger}>
      <div className="feed-posts">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id} post={post} onRefresh={loadFeed} />
          ))
        ) : (
          <p className="no-posts">No posts yet.</p>
        )}
      </div>
    </Layout>
  );
}
