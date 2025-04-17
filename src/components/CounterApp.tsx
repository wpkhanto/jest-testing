import useCounter from '../hooks/useCounter';
import Button from './Button';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

const CounterDisplay = () => {
  const { theme } = useTheme();
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div 
      data-testid="counter-app"
      className={`counter-app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
    >
      <h2>Counter App</h2>
      <p data-testid="counter-value">Current count: {count}</p>
      
      <div className="counter-buttons">
        <Button label="Increment" onClick={increment} />
        <Button label="Decrement" onClick={decrement} />
        <Button label="Reset" onClick={reset} />
      </div>
    </div>
  );
};

// Component สำหรับเปลี่ยน Theme
const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggle">
      <p data-testid="current-theme">Current theme: {theme}</p>
      <Button 
        label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} 
        onClick={toggleTheme}
        data-testid="theme-toggle-button"
      />
    </div>
  );
};

// Wrapper component ที่จัดการกับ ThemeProvider
const CounterApp = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <CounterDisplay />
        <ThemeToggler />
      </div>
    </ThemeProvider>
  );
};

export default CounterApp;