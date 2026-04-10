import { useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    void handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <div>
      <nav className="border-b border-(--border) px-6 py-4">
        <ul className="m-0 flex flex-wrap gap-3 p-0 list-none [&>li>a]:text-(--text-h) [&>li>a]:no-underline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
