// 4. ทดสอบ Custom Link Component
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CustomLink from './CustomLink';

// Component ที่เป็น custom link
// function CustomLink({ to, children }) {
//   const navigate = useNavigate();
//   const handleClick = (e) => {
//     e.preventDefault();
//     // อาจมีตรรกะเพิ่มเติม เช่น analytics
//     navigate(to);
//   };
//   return <a href={to} onClick={handleClick}>{children}</a>;
// }

describe('CustomLink Component', () => {
  test('navigates to the correct route when clicked', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/home" element={
            <div>
              <h1>Home Page</h1>
              <CustomLink to="/about">Go to About</CustomLink>
            </div>
          } />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    
    // ตรวจสอบว่าหน้าแรกแสดงผลถูกต้อง
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    
    // คลิกลิงก์
    fireEvent.click(screen.getByText('Go to About'));
    
    // ตรวจสอบว่าได้นำทางไปยังหน้า About
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });
});
