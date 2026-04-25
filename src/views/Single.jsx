import { useLocation, useNavigate } from 'react-router';
import Likes from '../components/Likes';
import { useUserContext } from '../hooks/contextHooks';

const Single = () => {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();
  const { user } = useUserContext();

  if (!item) return <p>No item selected</p>;

  // Eğer kullanıcı yoksa login sayfasına yönlendir
  if (!user) {
    navigate('/login', { state: { from: { pathname: '/single', item } } });
    return null;
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 text-left">
      <div className="space-y-2">
        <h2>{item.title}</h2>
        <p>Owner: {item.username}</p>
        <p>{item.description}</p>
      </div>

      {item.media_type.includes('image') ? (
        <img
          className="w-full rounded-2xl shadow-(--shadow)"
          src={item.filename}
          alt={item.title}
        />
      ) : (
        <video
          className="w-full rounded-2xl shadow-(--shadow)"
          controls
          src={item.filename}
        ></video>
      )}

      <Likes mediaId={item.media_id} />

      <button
        className="inline-flex w-fit items-center justify-center rounded-lg border border-(--accent-border) bg-(--accent-bg) px-4 py-3 font-medium text-(--text-h) transition hover:-translate-y-0.5"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
};

export default Single;
