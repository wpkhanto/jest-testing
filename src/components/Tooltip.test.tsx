// 5. การทดสอบ Tooltip Component
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
  test('does not show tooltip content initially', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    // ตรวจสอบว่าตัวปุ่มแสดงอยู่
    expect(screen.getByRole('button')).toBeInTheDocument();
    
    // ตรวจสอบว่าไม่แสดง tooltip ในตอนแรก
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('shows tooltip when hovering over the trigger element', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    // จำลองการ hover
    fireEvent.mouseEnter(screen.getByRole('button'));
    
    // ตรวจสอบว่าแสดง tooltip
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });

  test('hides tooltip when moving mouse away from trigger element', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    // จำลองการ hover
    fireEvent.mouseEnter(screen.getByRole('button'));
    
    // ตรวจสอบว่าแสดง tooltip
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
    
    // จำลองการเลื่อนเมาส์ออก
    fireEvent.mouseLeave(screen.getByRole('button'));
    
    // ตรวจสอบว่า tooltip หายไป
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('positions tooltip correctly based on position prop', () => {
    render(
      <Tooltip content="Tooltip on top" position="top">
        <button>Hover me</button>
      </Tooltip>
    );
    
    // จำลองการ hover
    fireEvent.mouseEnter(screen.getByRole('button'));
    
    // ตรวจสอบว่า tooltip มี class ที่ถูกต้องตามตำแหน่ง
    const tooltip = screen.getByText('Tooltip on top').parentElement;
    expect(tooltip).toHaveClass('tooltip-top');
  });
});
