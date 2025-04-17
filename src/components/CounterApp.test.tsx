import { render, screen, fireEvent } from '@testing-library/react';
import CounterApp from './CounterApp';

describe('CounterApp Integration Test', () => {
  test('renders the counter app with default values', () => {
    render(<CounterApp />);
    
    // ตรวจสอบว่า component ถูก render ถูกต้อง
    expect(screen.getByTestId('counter-app')).toBeInTheDocument();
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 0');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: light');
  });

  test('increments counter when increment button is clicked', () => {
    render(<CounterApp />);
    
    const incrementButton = screen.getByText('Increment');
    
    // กดปุ่ม Increment
    fireEvent.click(incrementButton);
    
    // ตรวจสอบว่าค่า counter เพิ่มขึ้น
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 1');
    
    // กดอีกครั้ง
    fireEvent.click(incrementButton);
    
    // ตรวจสอบว่าค่า counter เพิ่มขึ้นอีก
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 2');
  });

  test('decrements counter when decrement button is clicked', () => {
    render(<CounterApp />);
    
    // เพิ่มค่าก่อน
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    // ตรวจสอบว่าค่า counter เป็น 2
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 2');
    
    // กดปุ่ม Decrement
    const decrementButton = screen.getByText('Decrement');
    fireEvent.click(decrementButton);
    
    // ตรวจสอบว่าค่า counter ลดลง
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 1');
  });

  test('resets counter when reset button is clicked', () => {
    render(<CounterApp />);
    
    // เพิ่มค่าก่อน
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    // ตรวจสอบว่าค่า counter เป็น 2
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 2');
    
    // กดปุ่ม Reset
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    // ตรวจสอบว่าค่า counter กลับไปเป็น 0
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 0');
  });

  test('toggles theme when theme toggle button is clicked', () => {
    render(<CounterApp />);
    
    // ตรวจสอบค่าเริ่มต้น
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: light');
    expect(screen.getByTestId('counter-app')).toHaveClass('light-theme');
    
    // กดปุ่มเปลี่ยน theme
    const themeToggleButton = screen.getByText('Switch to dark theme');
    fireEvent.click(themeToggleButton);
    
    // ตรวจสอบว่า theme เปลี่ยนเป็น dark
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: dark');
    expect(screen.getByTestId('counter-app')).toHaveClass('dark-theme');
    
    // กดปุ่มอีกครั้ง
    const themeToggleButtonUpdated = screen.getByText('Switch to light theme');
    fireEvent.click(themeToggleButtonUpdated);
    
    // ตรวจสอบว่า theme เปลี่ยนกลับเป็น light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: light');
    expect(screen.getByTestId('counter-app')).toHaveClass('light-theme');
  });

  test('all functionalities work together appropriately', () => {
    render(<CounterApp />);
    
    // เช็คค่าเริ่มต้น
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 0');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: light');
    
    // เพิ่มค่า counter
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    // เปลี่ยน theme
    const themeToggleButton = screen.getByText('Switch to dark theme');
    fireEvent.click(themeToggleButton);
    
    // ตรวจสอบว่าทั้ง counter และ theme เปลี่ยนแปลงถูกต้อง
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 2');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: dark');
    expect(screen.getByTestId('counter-app')).toHaveClass('dark-theme');
    
    // ลดค่า counter
    const decrementButton = screen.getByText('Decrement');
    fireEvent.click(decrementButton);
    
    // ตรวจสอบว่า counter ลดลงและ theme ยังคงเป็น dark
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Current count: 1');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('Current theme: dark');
  });
});