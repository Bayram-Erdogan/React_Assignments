import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import fetchData from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaUrl = `${import.meta.env.VITE_MEDIA_API}/media`;
      const authUrl = import.meta.env.VITE_AUTH_API;
      const json = await fetchData(mediaUrl);

      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await fetchData(`${authUrl}/users/${item.user_id}`);

          return {
            ...item,
            username: result.username,
          };
        })
      );

      setMediaArray(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Size</th>
              <th>Type</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {mediaArray.map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
