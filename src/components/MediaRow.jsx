import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const MediaRow = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/single', { state: { item } });
  };
  return (
    <tr>
      <td style={{ cursor: 'pointer' }} onClick={handleClick}>
        <img src={item.thumbnail} alt={item.title} width={80} />
      </td>
      <td style={{ cursor: 'pointer' }} onClick={handleClick}>
        {item.title}
      </td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username || ''}</td>
      <td>
        <button
          onClick={handleClick}
          style={{
            padding: '4px 10px',
            borderRadius: 6,
            background: '#eee',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number,
    filename: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
