import React from 'react';
import '../templates/css/style.css';
import '../templates/css/responsive.css';

const Blog = () => {
  return (
    <div>
      <header>
        <div className="header-text">
          <h2>Blog</h2>
          <p>Welcome to our blog page</p>
        </div>
      </header>

      <div className="blog-content">
        <div className="container">
          <div className="row">
            {/* Add blog posts here */}
            <div className="col-md-4">
              <div className="single-blog">
                <img src="../templates/img/blog/blog1.jpg" alt="blog post" />
                <h3>Blog Title 1</h3>
                <p>Blog description goes here...</p>
              </div>
            </div>
            {/* Add more blog posts here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

