import { useNavigate } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomLink({ to, children }: CustomLinkProps) {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // อาจมีตรรกะเพิ่มเติม เช่น analytics หรือการแสดง loading
    navigate(to);
  };
  
  return <a href={to} onClick={handleClick}>{children}</a>;
}

export default CustomLink;