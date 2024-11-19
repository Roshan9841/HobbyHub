import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
      }
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id);
      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select(); // Ensure the updated post is returned
    if (error) {
      console.error('Error upvoting post:', error);
    } else {
      setPost(data[0]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: newComment }])
      .select(); // Ensure the inserted comment is returned
    if (error) {
      console.error('Error adding comment:', error);
    } else {
      if (data && data.length > 0) {
        setComments([...comments, data[0]]);
      }
      setNewComment('');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) {
        console.error('Error deleting post:', error);
      } else {
        navigate('/');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .update({ title: editTitle, content: editContent })
      .eq('id', id)
      .select(); // Ensure the updated post is returned
    if (error) {
      console.error('Error updating post:', error);
    } else {
      if (data && data.length > 0) {
        setPost(data[0]);
      }
      setIsEditing(false);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <div className="container">
        {isEditing ? (
          <form className="edit-post-form" onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
            <p>Upvotes: {post.upvotes}</p>
            <button onClick={handleUpvote} className="submit-button">Upvote</button>
            <button onClick={handleDelete} className="submit-button">Delete Post</button>
            <button onClick={() => setIsEditing(true)} className="submit-button">Edit Post</button>
          </>
        )}
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
            placeholder="Add a comment..."
          />
          <button type="submit" className="submit-button">Add Comment</button>
        </form>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;