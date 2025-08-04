import { useState } from 'react';
import apiFetch from '../api/Api';
import '../Postcard.css'; 

export default function PostCard({ post, onRefresh }) {
  const [comment, setComment] = useState('');
  const currentUserId = localStorage.getItem('userId');
  const hasLiked = post.likes?.includes(currentUserId);

  const likePost = () => {
    if (hasLiked) return;
    apiFetch(`/posts/like/${post._id}`, { method: 'PUT' })
      .then(() => onRefresh())
      .catch(err => console.error('Like error:', err));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    apiFetch(`/posts/comment/${post._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
    })
      .then(() => {
        setComment('');
        onRefresh();
      })
      .catch(err => console.error('Comment error:', err));
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-author">{post.author?.name}</span>
      </div>

      <div className="post-content">{post.content}</div>

      {post.mediaUrl && (
        <div className="post-media">
          <img src={post.mediaUrl} alt="media" />
        </div>
      )}

      <div className="post-actions">
        <button
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={likePost}
          disabled={hasLiked}
        >
          ❤️ {post.likes?.length || 0}
        </button>
      </div>

      <div className="post-comments">
        {post.comments?.map(c => (
          <p key={c._id} className="comment-line">
            <strong>{c.author?.name}</strong>: {c.comment}
          </p>
        ))}
      </div>

      <form className="comment-form" onSubmit={submitComment}>
        <input
          className="comment-input"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit" className="comment-submit">Post</button>
      </form>
    </div>
  );
}
