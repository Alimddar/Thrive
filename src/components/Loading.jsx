import React from 'react';

const Loading = ({ title = 'Yüklənir...', subtitle = 'Zəhmət olmasa gözləyin' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-title">{title}</h2>
        <p className="loading-text">{subtitle}</p>
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
