import { useEffect, useState } from 'react';
import { useUserContext } from '../hooks/contextHooks';
import { useLike } from '../hooks/apiHooks';

const Likes = ({ mediaId }) => {
  const { user } = useUserContext();
  const { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser } =
    useLike();
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadLikes = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const likeCountResult = await getLikeCountByMediaId(mediaId);
        setLikeCount(likeCountResult.count ?? 0);

        if (user) {
          try {
            const likeResult = await getLikeByUser(
              mediaId,
              localStorage.getItem('token')
            );
            setUserLike(likeResult);
          } catch (error) {
            setUserLike(null);
          }
        } else {
          setUserLike(null);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Likes could not be loaded');
        setLikeCount(0);
        setUserLike(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadLikes();
  }, [getLikeByUser, getLikeCountByMediaId, mediaId, user]);

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      if (userLike) {
        await deleteLike(userLike.like_id, token);
        setUserLike(null);
        setLikeCount((currentCount) => Math.max(currentCount - 1, 0));
        return;
      }

      await postLike(mediaId, token);
      const likeResult = await getLikeByUser(mediaId, token);
      setUserLike(likeResult);
      setLikeCount((currentCount) => currentCount + 1);
    } catch (error) {
      console.error(error);
      setErrorMessage('Like action failed');
    }
  };

  const buttonText = userLike ? 'Unlike' : 'Like';
  const buttonStateClassName = userLike
    ? 'border-(--accent-border) bg-(--accent) text-white'
    : 'border-(--accent-border) bg-(--accent-bg) text-(--text-h)';

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-(--border) bg-(--bg) p-4 shadow-(--shadow)">
      <button
        className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 ${buttonStateClassName}`}
        type="button"
        onClick={handleLikeToggle}
        disabled={!user || isLoading}
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>
      <span className="text-sm font-medium text-(--text-h)">
        {likeCount} likes
      </span>
      {!user && (
        <span className="text-sm text-(--text)">Login to like this media</span>
      )}
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default Likes;
