import { Link } from 'react-router';

const MediaRow = ({ item }) => (
  <tr>
    <td>
      <img src={item.thumbnail} alt={item.title} />
    </td>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{new Date(item.created_at).toLocaleString()}</td>
    <td>{item.filesize}</td>
    <td>{item.media_type}</td>
    <td>
      <Link to="/single" state={{ item }}>
        View
      </Link>
    </td>
  </tr>
);

export default MediaRow;
