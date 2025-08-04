import { useState } from 'react';
import apiFetch from '../api/Api';
import '../CreatePost.css';

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('[CreatePost] Submitting post...');
    const formData = new FormData();
    formData.append('content', content);
    formData.append('is_private', isPrivate);
    if (file) formData.append('file', file);

    try {
      const data = await apiFetch('/posts', {
        method: 'POST',
        body: formData
      });

      // console.log('[CreatePost] Post created:', data);

     if (data && data._id) {
  setContent('');
  setFile(null);
  setIsPrivate(false);
  if (onPostCreated) onPostCreated();
}

    } catch (error) {
      console.error('[CreatePost] Failed to create post:', error);
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <textarea
        className="create-textarea"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />

      <div className="create-post-controls">
        <label className="file-upload">
          📎 Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
          />
        </label>

        <label className="private-toggle">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
          />
          Private
        </label>

        <button type="submit" className="post-btn">Post</button>
      </div>
    </form>
  );
}
