import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    // ตรรกะการ login จะอยู่ตรงนี้
    // ...
    // หลังจาก login สำเร็จ นำทางไปยัง dashboard
    navigate('/dashboard');
  };
  
  return <button onClick={handleLogin}>Login</button>;
}

export default LoginButton;