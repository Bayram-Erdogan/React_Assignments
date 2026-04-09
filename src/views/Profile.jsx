import { useUserContext } from '../hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <h2>Profile Page</h2>;
  }

  return (
    <>
      <h2>Profile Page</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Level: {user.level_name}</p>
      <p>Created: {new Date(user.created_at).toLocaleString()}</p>
    </>
  );
};

export default Profile;
