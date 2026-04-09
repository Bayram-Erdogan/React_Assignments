import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setShowLogin((prev) => !prev)}>
        {showLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
