import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to CKEditor Component Library</h1>
        <p>A reusable CKEditor component for your React projects</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Easy to Use</h3>
          <p>Simple integration with just a few lines of code</p>
        </div>
        <div className="feature-card">
          <h3>Fully Customizable</h3>
          <p>Customize the editor to match your project's needs</p>
        </div>
        <div className="feature-card">
          <h3>Ready to Download</h3>
          <p>Download the component files and start using immediately</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
