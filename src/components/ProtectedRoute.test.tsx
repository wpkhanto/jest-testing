// 3. ทดสอบ Protected Routes
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';

// Mock AuthContext ที่จำลองการเข้าสู่ระบบ
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: jest.fn().mockReturnValue(true), // หรือ false เพื่อทดสอบการ redirect
  }),
}));

describe('ProtectedRoute Component', () => {
  test('renders protected component when user is authenticated', () => {
    // Mock useAuth ให้ส่งค่า isAuthenticated = true
    require('../contexts/AuthContext').useAuth.isAuthenticated.mockReturnValue(true);
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    
    // ตรวจสอบว่าแสดง Dashboard เมื่อผู้ใช้เข้าสู่ระบบแล้ว
    expect(screen.getByText('Welcome to Dashboard')).toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    // Mock useAuth ให้ส่งค่า isAuthenticated = false
    require('../contexts/AuthContext').useAuth.isAuthenticated.mockReturnValue(false);
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    
    // ตรวจสอบว่า redirect ไปที่หน้า Login
    expect(screen.getByText('Please login to continue')).toBeInTheDocument();
    // ตรวจสอบว่าไม่แสดง Dashboard
    expect(screen.queryByText('Welcome to Dashboard')).not.toBeInTheDocument();
  });
});