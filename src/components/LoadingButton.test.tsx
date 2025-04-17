// 7. การทดสอบการแสดง Loading State
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingButton from './LoadingButton';

describe('LoadingButton Component', () => {
  test('renders button with correct label when not loading', () => {
    render(<LoadingButton loading={false} onClick={() => {}}>Submit</LoadingButton>);
    
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  test('renders loading spinner and disables button when loading', () => {
    render(<LoadingButton loading={true} onClick={() => {}}>Submit</LoadingButton>);
    
    const button = screen.getByRole('button');
    
    // ตรวจสอบว่าแสดง loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // ตรวจสอบว่าปุ่มถูก disabled
    expect(button).toBeDisabled();
    
    // ตรวจสอบว่ายังคงมีข้อความเดิม
    expect(button).toHaveTextContent('Submit');
  });

  test('calls onClick when button is clicked and not loading', () => {
    const handleClick = jest.fn();
    render(<LoadingButton loading={false} onClick={handleClick}>Submit</LoadingButton>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when button is clicked while loading', () => {
    const handleClick = jest.fn();
    render(<LoadingButton loading={true} onClick={handleClick}>Submit</LoadingButton>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
