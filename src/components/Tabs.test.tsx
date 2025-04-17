// 4. การทดสอบ Tab Component
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';
import TabPanel from './TabPanel';

describe('Tabs Component', () => {
  test('renders tabs with correct labels', () => {
    render(
      <Tabs>
        <TabPanel label="Tab 1" key="tab1">Content for Tab 1</TabPanel>
        <TabPanel label="Tab 2" key="tab2">Content for Tab 2</TabPanel>
      </Tabs>
    );
    
    // ตรวจสอบว่าแสดงแท็บทั้งหมด
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    
    // ตรวจสอบว่าแสดงเนื้อหาของแท็บแรกเป็นค่าเริ่มต้น
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
  });

  test('changes content when a different tab is clicked', () => {
    render(
      <Tabs>
        <TabPanel label="Tab 1" key="tab1">Content for Tab 1</TabPanel>
        <TabPanel label="Tab 2" key="tab2">Content for Tab 2</TabPanel>
      </Tabs>
    );
    
    // คลิกที่แท็บที่สอง
    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    
    // ตรวจสอบว่าเนื้อหาเปลี่ยนไปเป็นของแท็บที่สอง
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });
  
  test('applies active class to the selected tab', () => {
    render(
      <Tabs>
        <TabPanel label="Tab 1" key="tab1">Content for Tab 1</TabPanel>
        <TabPanel label="Tab 2" key="tab2">Content for Tab 2</TabPanel>
      </Tabs>
    );
    
    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    
    // ตรวจสอบว่าแท็บแรกมี class active เป็นค่าเริ่มต้น
    expect(tab1).toHaveClass('active');
    expect(tab2).not.toHaveClass('active');
    
    // คลิกที่แท็บที่สอง
    fireEvent.click(tab2);
    
    // ตรวจสอบว่า class active เปลี่ยนไปอยู่ที่แท็บที่สอง
    expect(tab1).not.toHaveClass('active');
    expect(tab2).toHaveClass('active');
  });
});
