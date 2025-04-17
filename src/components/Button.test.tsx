import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    
    // ตรวจสอบว่ามีปุ่มที่มีข้อความ "Click me" อยู่หรือไม่
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    // สร้าง mock function เพื่อตรวจสอบว่าถูกเรียกหรือไม่
    const mockOnClick = jest.fn();
    
    render(<Button label="Click me" onClick={mockOnClick} />);
    const buttonElement = screen.getByText('Click me');
    
    // จำลองการคลิกปุ่ม
    fireEvent.click(buttonElement);
    
    // ตรวจสอบว่า onClick function ถูกเรียกหรือไม่
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled={true} />);
    
    const buttonElement = screen.getByText('Click me');
    
    // ตรวจสอบว่าปุ่มถูก disabled หรือไม่
    expect(buttonElement).toBeDisabled();
    // ตรวจสอบว่ามี class ที่ถูกต้องหรือไม่
    expect(buttonElement).toHaveClass('button-disabled');
  });
});