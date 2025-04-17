import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  return <div>User Profile: {userId}</div>;
}

export default UserProfile;
