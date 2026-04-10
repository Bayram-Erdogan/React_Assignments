import { createContext, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthentication, useUser } from '../hooks/apiHooks';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const loginResult = await postLogin(credentials);
        localStorage.setItem('token', loginResult.token);

        if (loginResult.user) {
          setUser(loginResult.user);
        } else {
          const userResult = await getUserByToken(loginResult.token);
          setUser(userResult.user);
        }

        navigate(location.state?.from?.pathname || '/');
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
    [postLogin, getUserByToken, location.state, navigate]
  );

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  }, [navigate]);

  const handleAutoLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    } catch (e) {
      console.log(e.message);
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [getUserByToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        handleAutoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
