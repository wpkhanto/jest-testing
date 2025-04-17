// 2. ทดสอบการนำทางโดยใช้ useNavigate
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './LoginButton';
import Dashboard from './Dashboard';

// Component ที่ใช้ useNavigate
// function LoginButton() {
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     // Login logic...
//     navigate('/dashboard');
//   };
//   return <button onClick={handleLogin}>Login</button>;
// }

describe('LoginButton Navigation', () => {
  test('navigates to dashboard after login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginButton />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );
    
    // คลิกปุ่ม Login
    fireEvent.click(screen.getByText('Login'));
    
    // ตรวจสอบว่าได้นำทางไปยัง Dashboard
    expect(screen.getByText('Welcome to Dashboard')).toBeInTheDocument();
  });
});