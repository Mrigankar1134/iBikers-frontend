import React from 'react';
import '../styles/Loader.scss';

const Loader = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;