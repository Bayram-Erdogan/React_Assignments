import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
  const { postUser } = useUser();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postUser(inputs);
      console.log(registerResult);
    } catch (error) {
      console.error(error);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doRegister,
    initValues
  );

  return (
    <>
      <h1>Register</h1>
      <form
        className="mx-auto flex max-w-md flex-col gap-4 text-left"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-(--text-h)" htmlFor="registeruser">
            Username
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
            value={inputs.username}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-(--text-h)"
            htmlFor="registeremail"
          >
            Email
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
            value={inputs.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-(--text-h)"
            htmlFor="registerpassword"
          >
            Password
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
            value={inputs.password}
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-(--accent) px-4 py-3 font-medium text-white transition hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
