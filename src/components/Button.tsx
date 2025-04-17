import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`button ${disabled ? 'button-disabled' : ''}`}
    >
      {label}
    </button>
  );
};

export default Button;