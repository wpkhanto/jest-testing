// แนวทางการเขียน Unit Test สำหรับ UI Components

// 1. การทดสอบ Modal Component
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    // ตรวจสอบว่า Modal ไม่ปรากฏในหน้าจอ
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    // ตรวจสอบว่า Modal ปรากฏในหน้าจอ
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    // คลิกปุ่มปิด Modal
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    // ตรวจสอบว่าได้เรียกฟังก์ชัน onClose
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
