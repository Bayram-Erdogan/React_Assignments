import MediaRow from './MediaRow';

const mediaArray = [
  {
    media_id: 1,
    title: 'Picture 1',
    thumbnail: 'https://place-hold.it/320/240.jpg&text=Thumb1&fontsize=20',
    description: 'This is a placeholder picture.',
    created_at: '2024-01-07T20:49:34.000Z',
    filesize: 170469,
    media_type: 'image/jpeg',
  },
  {
    media_id: 2,
    title: 'Picture 2',
    thumbnail: 'https://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
    description: 'Another placeholder picture.',
    created_at: '2024-01-07T21:32:27.000Z',
    filesize: 1002912,
    media_type: 'image/jpeg',
  },
  {
    media_id: 3,
    title: 'Bunny Video',
    thumbnail: 'https://place-hold.it/320/240.jpg&text=Thumb3&fontsize=20',
    description: 'Butterflies fly around the bunny.',
    created_at: '2024-01-07T20:48:13.000Z',
    filesize: 1236616,
    media_type: 'video/mp4',
  },
];

const Home = () => {
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <tr key={item.media_id}>
              <td>
                <img src={item.thumbnail} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
              <td>{item.filesize}</td>
              <td>{item.media_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
