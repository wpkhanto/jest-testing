import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ redirect ไปหน้า login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // ถ้าเข้าสู่ระบบแล้วให้แสดงเนื้อหาที่ส่งเข้ามา
  return <>{children}</>;
}

export default ProtectedRoute;
