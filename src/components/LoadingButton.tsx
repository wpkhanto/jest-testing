import React from 'react';

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  loading, 
  onClick, 
  children 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className={`button ${loading ? 'button-loading' : ''}`}
    >
      {loading && (
        <span className="spinner" data-testid="loading-spinner">
          {/* Spinner animation */}
          &#8635;
        </span>
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
