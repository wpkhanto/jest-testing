import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <button 
        type="button" 
        onClick={handleToggle}
        className="dropdown-toggle"
      >
        {selectedOption?.label || 'Select...'}
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map(option => (
            <li 
              key={option.value} 
              onClick={() => handleSelect(option.value)}
              className={option.value === value ? 'active' : ''}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
