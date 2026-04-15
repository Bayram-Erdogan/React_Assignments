import { useUserContext } from '../hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <h2>Profile Page</h2>;
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 text-left">
      <h2>Profile Page</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Level: {user.level_name}</p>
      <p>Created: {new Date(user.created_at).toLocaleString()}</p>
    </div>
  );
};

export default Profile;
