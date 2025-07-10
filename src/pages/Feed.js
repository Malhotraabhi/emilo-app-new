import { useEffect, useState } from 'react';
import apiFetch from '../api/Api';
import Navbar from '../components/Navbar'; 
import '../index.css';

export default function Feed({ setToken }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiFetch('/posts/feed')
      .then(res => setPosts(res.result))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar setToken={setToken} />
      <div className="feed-container">
        <h2 className="feed-heading">📰 Feed</h2>
        {posts.map(post => (
          <div className="feed-post" key={post._id}>
            <div className="feed-post-header">
              <strong>{post.author?.name || 'Anonymous'}</strong> ·{' '}
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>

            <p className="feed-post-content">{post.content}</p>

            {post.mediaUrl && (
              <img
                src={post.mediaUrl}
                alt="post"
                className="feed-post-image"
              />
            )}

            <div className="feed-post-likes">
              ❤️ {post.likes?.length || 0} likes
            </div>

            {post.comments?.length > 0 && (
              <div className="feed-post-comments">
                <strong>Comments:</strong>
                {post.comments.slice(0, 2).map((comment) => (
                  <div key={comment._id} className="feed-post-comment">
                    <strong>{comment.author?.name || 'User'}:</strong> {comment.comment}
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <div className="feed-post-comment-more">
                    ...and {post.comments.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
