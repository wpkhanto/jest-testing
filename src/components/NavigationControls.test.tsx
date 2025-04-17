// 5. ทดสอบ Navigation History (ย้อนกลับ/ไปข้างหน้า)
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Routes, Route } from 'react-router-dom';
import NavigationControls from './NavigationControls';

// Component ที่มีปุ่มย้อนกลับ/ไปข้างหน้า
// function NavigationControls() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <button onClick={() => navigate(1)}>Forward</button>
//     </div>
//   );
// }

describe('NavigationControls Component', () => {
  test('navigates back and forward correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/about', '/contact'] });
    history.push('/contact'); // ตั้งค่าตำแหน่งปัจจุบันให้เป็น /contact
    
    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/home" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={
            <>
              <h1>Contact Page</h1>
              <NavigationControls />
            </>
          } />
        </Routes>
      </Router>
    );
    
    // ตรวจสอบว่าอยู่ที่หน้า Contact
    expect(screen.getByText('Contact Page')).toBeInTheDocument();
    
    // คลิกปุ่มย้อนกลับ
    fireEvent.click(screen.getByText('Back'));
    
    // ตรวจสอบว่าได้ย้อนกลับไปยังหน้า About
    expect(screen.getByText('About Page')).toBeInTheDocument();
    
    // คลิกปุ่มไปข้างหน้า
    fireEvent.click(screen.getByText('Forward'));
    
    // ตรวจสอบว่าได้ไปข้างหน้าไปยังหน้า Contact
    expect(screen.getByText('Contact Page')).toBeInTheDocument();
  });
});