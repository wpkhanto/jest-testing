import { useNavigate } from 'react-router-dom';

function NavigationControls() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(1)}>Forward</button>
    </div>
  );
}

export default NavigationControls;