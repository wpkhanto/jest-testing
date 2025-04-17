// 6. การทดสอบ Responsive Layout Component
import { render, screen } from '@testing-library/react';
import ResponsiveContainer from './ResponsiveContainer';

// Mock useMediaQuery
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn()
}));

import { useMediaQuery } from 'react-responsive';

describe('ResponsiveContainer Component', () => {
  beforeEach(() => {
    // Reset mock before each test
    (useMediaQuery as jest.Mock).mockReset();
  });

  test('renders desktop layout on large screens', () => {
    // Mock desktop screen
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    
    render(<ResponsiveContainer />);
    
    // ตรวจสอบว่าแสดง layout แบบ desktop
    expect(screen.getByTestId('desktop-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-layout')).not.toBeInTheDocument();
  });

  test('renders mobile layout on small screens', () => {
    // Mock mobile screen
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    
    render(<ResponsiveContainer />);
    
    // ตรวจสอบว่าแสดง layout แบบ mobile
    expect(screen.getByTestId('mobile-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-layout')).not.toBeInTheDocument();
  });
});
