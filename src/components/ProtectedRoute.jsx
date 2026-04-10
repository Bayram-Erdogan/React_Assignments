import { Navigate, useLocation } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
