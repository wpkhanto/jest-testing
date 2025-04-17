// รูปแบบการเขียนเทสสำหรับ React Router

// 1. ทดสอบ Component ที่ใช้ useParams
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

// Component ที่ใช้ useParams
// function UserProfile() {
//   const { userId } = useParams();
//   return <div>User Profile: {userId}</div>;
// }

describe('UserProfile Component with Router', () => {
  test('renders user profile with the correct ID from URL params', () => {
    render(
      <MemoryRouter initialEntries={['/users/123']}>
        <Routes>
          <Route path="/users/:userId" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('User Profile: 123')).toBeInTheDocument();
  });
});
