import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          return;
        }

        const userData = await getUserByToken(token);
        setProfile(userData.user);
      } catch (error) {
        console.error(error);
      }
    };

    void getProfile();
  }, []);

  if (!profile) {
    return <h2>Profile Page</h2>;
  }

  return (
    <>
      <h2>Profile Page</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Level: {profile.level_name}</p>
      <p>Created: {new Date(profile.created_at).toLocaleString()}</p>
    </>
  );
};

export default Profile;
