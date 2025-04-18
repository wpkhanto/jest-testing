import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// สร้าง Test Component ที่ใช้ ThemeContext
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  test('provides initial theme value correctly', () => {
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme').textContent).toBe('light');
  });

  test('toggles theme when the toggle function is called', () => {
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    // ตรวจสอบค่าเริ่มต้น
    expect(screen.getByTestId('current-theme').textContent).toBe('light');
    
    // กดปุ่มเพื่อเปลี่ยน theme
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // ตรวจสอบว่า theme เปลี่ยนเป็น dark
    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    
    // กดปุ่มอีกครั้งเพื่อเปลี่ยนกลับไป light
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // ตรวจสอบว่า theme เปลี่ยนกลับเป็น light
    expect(screen.getByTestId('current-theme').textContent).toBe('light');
  });

  test('uses default light theme when no initialTheme is provided', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme').textContent).toBe('light');
  });

  test('throws error when useTheme is used outside of ThemeProvider', () => {
    // Spy on console.error to suppress the expected error in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Define a component that uses useTheme without a provider
    const InvalidComponent = () => {
      // This should throw an error
      useTheme();
      return null;
    };

    // Expect the render to throw an error
    expect(() => {
      render(<InvalidComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    // Restore console.error
    (console.error as jest.Mock).mockRestore();
  });
});