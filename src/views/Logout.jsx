import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <h2>Logout</h2>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
