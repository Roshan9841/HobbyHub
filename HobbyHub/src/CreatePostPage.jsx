import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url: imageUrl, upvotes: 0 }]); // Provide a default value for upvotes
    if (error) {
      console.error('Error creating post:', error);
    } else {
      console.log('Post created:', data);
      navigate('/'); // Navigate to the homepage after creating the post
    }
  };

  return (
    <div className="main-content">
      <div className="container">
        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;