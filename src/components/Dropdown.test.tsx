// 2. การทดสอบ Dropdown Component
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  test('renders dropdown with correct label', () => {
    render(
      <Dropdown 
        options={options} 
        value="option1" 
        onChange={() => {}}
        label="Select an option"
      />
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  test('shows options when dropdown is clicked', () => {
    render(
      <Dropdown 
        options={options} 
        value="option1" 
        onChange={() => {}}
        label="Select an option"
      />
    );
    
    // คลิก dropdown เพื่อแสดงตัวเลือก
    fireEvent.click(screen.getByRole('button'));
    
    // ตรวจสอบว่าแสดงตัวเลือกทั้งหมด
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown 
        options={options} 
        value="option1" 
        onChange={handleChange}
        label="Select an option"
      />
    );
    
    // คลิก dropdown เพื่อแสดงตัวเลือก
    fireEvent.click(screen.getByRole('button'));
    
    // คลิกเลือก Option 2
    fireEvent.click(screen.getByText('Option 2'));
    
    // ตรวจสอบว่าได้เรียกฟังก์ชัน onChange ด้วยค่าที่ถูกต้อง
    expect(handleChange).toHaveBeenCalledWith('option2');
  });
});
