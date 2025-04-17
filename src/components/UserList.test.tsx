import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock global fetch
global.fetch = jest.fn();

describe('UserList Component', () => {
  // Mock ของข้อมูลที่ต้องการให้ API ส่งกลับมา
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state initially', () => {
    // Mock fetch แบบไม่ resolved เพื่อให้ component ยังคงอยู่ใน loading state
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<UserList />);
    
    // ตรวจสอบว่าแสดง loading state หรือไม่
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('renders user list when fetch is successful', async () => {
    // Mock fetch ให้ส่งข้อมูลกลับมา
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    
    render(<UserList />);
    
    // รอให้ fetch เสร็จและข้อมูลถูกแสดง
    await waitFor(() => {
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
    });
    
    // ตรวจสอบข้อมูลที่แสดง
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByTestId('user-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-item-2')).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    // Mock fetch ให้ส่งข้อผิดพลาดกลับมา
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });
    
    render(<UserList />);
    
    // รอให้แสดงข้อความ error
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Error fetching users')).toBeInTheDocument();
  });

  test('shows no users message when fetch returns empty array', async () => {
    // Mock fetch ให้ส่ง array ว่างกลับมา
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    
    render(<UserList />);
    
    // รอให้แสดงข้อความไม่มี user
    await waitFor(() => {
      expect(screen.getByTestId('no-users')).toBeInTheDocument();
    });
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});