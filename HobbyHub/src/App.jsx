import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CreatePostPage from './CreatePostPage';
import PostPage from './PostPage';
import './App.css'; // Import the CSS file for global styles

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">HobbyHub</Link>
        </div>
        <div className="nav-center">
          <input
            type="text"
            className="nav-search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link">Create Post</Link>
        </div>
      </nav>
      <div className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;