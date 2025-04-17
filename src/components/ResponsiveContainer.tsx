import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ResponsiveContainer: React.FC = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  return (
    <div className="responsive-container">
      {isDesktop ? (
        <div data-testid="desktop-layout" className="desktop-layout">
          <h1>Desktop View</h1>
          <div className="desktop-content">
            <div className="sidebar">Sidebar Navigation</div>
            <div className="main-content">Desktop Content</div>
          </div>
        </div>
      ) : (
        <div data-testid="mobile-layout" className="mobile-layout">
          <h1>Mobile View</h1>
          <div className="mobile-content">
            Mobile Content
          </div>
          <div className="mobile-nav">
            <button>Menu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveContainer;
