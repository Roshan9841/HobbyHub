import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

const HomePage = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState('created_at'); // Default sorting by created time
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Start loading
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(orderBy, { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
      setIsLoading(false); // End loading
    };

    fetchPosts();
  }, [orderBy]); // Re-fetch posts when the order changes

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="container">
        {/* Sort Section */}
        <div className="sort-section">
          <label>Order by:</label>
          <button
            className={`sort-button ${orderBy === 'created_at' ? 'active' : ''}`}
            onClick={() => setOrderBy('created_at')}
          >
            Newest
          </button>
          <button
            className={`sort-button ${orderBy === 'upvotes' ? 'active' : ''}`}
            onClick={() => setOrderBy('upvotes')}
          >
            Most Popular
          </button>
        </div>

        {/* Posts Section */}
        <div className="posts-wrapper">
          {isLoading ? (
            <p>Loading posts...</p> // Show loading indicator
          ) : filteredPosts.length === 0 ? (
            <p>No posts available</p> // Show message when no posts exist
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <p>Posted {new Date(post.created_at).toLocaleString()}</p>
                <h2>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <p>{post.upvotes} upvotes</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;