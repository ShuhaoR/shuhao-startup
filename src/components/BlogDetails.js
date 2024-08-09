import React from 'react';
import '../templates/css/style.css';
import '../templates/css/responsive.css';

const BlogDetails = () => {
  return (
    <div>
      <header>
        <div className="header-text">
          <h2>Blog Details</h2>
          <p>Detailed information about the blog</p>
        </div>
      </header>

      <div className="blog-details-content">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="single-blog-details">
                <img src="../templates/img/blog-details/blog1.jpg" alt="blog details" />
                <h3>Blog Title Details</h3>
                <p>Blog details content goes here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

