// 3. การทดสอบ Layout Component
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout Component', () => {
  test('renders header, content and footer', () => {
    render(
      <Layout>
        <div data-testid="content">Main Content</div>
      </Layout>
    );
    
    // ตรวจสอบว่าแสดง header และ footer
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // ตรวจสอบว่าแสดงเนื้อหาที่ส่งมา
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
  
  test('applies correct CSS classes', () => {
    render(
      <Layout theme="dark">
        <div>Content</div>
      </Layout>
    );
    
    // ตรวจสอบว่าใช้ class ที่ถูกต้อง
    expect(screen.getByTestId('layout-container')).toHaveClass('layout-dark');
  });
});
