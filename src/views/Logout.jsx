import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {
  const { handleLogout } = useUserContext();

  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-4 text-left">
      <h2>Logout</h2>
      <button
        className="inline-flex items-center justify-center rounded-lg bg-(--accent) px-4 py-3 font-medium text-white transition hover:opacity-90"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
