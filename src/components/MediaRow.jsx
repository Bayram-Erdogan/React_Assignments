import { Link, useNavigate } from 'react-router';
import { useMedia } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const buttonClassName =
  'inline-flex items-center whitespace-nowrap rounded-md border border-(--accent-border) bg-(--accent-bg) px-3 py-1.5 text-sm leading-none font-medium text-(--text-h) no-underline transition hover:-translate-y-0.5 hover:shadow-(--shadow)';

const MediaRow = ({ item, onMediaChanged }) => {
  const { user } = useUserContext();
  const { deleteMedia, modifyMedia } = useMedia();
  const navigate = useNavigate();
  const isAdmin = user?.level_name === 'admin';
  const isOwner = user?.user_id === item.user_id;
  const showActions = Boolean(user) && (isAdmin || isOwner);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const confirmed = window.confirm('Delete this media item?');
      if (!confirmed) {
        return;
      }

      await deleteMedia(item.media_id, token);
      if (onMediaChanged) {
        await onMediaChanged();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModify = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const nextTitle = window.prompt('New title:', item.title);
      if (nextTitle === null) {
        return;
      }

      const nextDescription = window.prompt(
        'New description:',
        item.description || ''
      );

      if (nextDescription === null) {
        return;
      }

      await modifyMedia(
        item.media_id,
        {
          title: nextTitle.trim(),
          description: nextDescription.trim(),
        },
        token
      );

      if (onMediaChanged) {
        await onMediaChanged();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="align-top">
      <td>
        <img
          className="h-18 w-18 rounded-lg object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
      <td className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Link className={buttonClassName} to="/single" state={{ item }}>
            View
          </Link>
          {showActions && (
            <>
              <button
                className={buttonClassName}
                type="button"
                onClick={handleModify}
              >
                Modify
              </button>
              <button
                className={buttonClassName}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
