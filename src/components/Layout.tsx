import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ children, theme = 'light' }) => {
  return (
    <div 
      className={`layout layout-${theme}`}
      data-testid="layout-container"
    >
      <header data-testid="header">
        <nav>
          <h1>My App</h1>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer data-testid="footer">
        <p>&copy; 2025 My App</p>
      </footer>
    </div>
  );
};

export default Layout;
