import useForm from '../hooks/formHooks';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (error) {
      console.error(error);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues
  );

  return (
    <>
      <h1>Login</h1>
      <form
        className="mx-auto flex max-w-md flex-col gap-4 text-left"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-(--text-h)" htmlFor="loginuser">
            Username
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            value={inputs.username}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-(--text-h)"
            htmlFor="loginpassword"
          >
            Password
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-(--accent) px-4 py-3 font-medium text-white transition hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
