import { useState } from 'react';
import MediaRow from './MediaRow';
import SingleView from './SingleView';

const mediaArray = [
  {
    media_id: 1,
    title: 'Picture 1',
    filename: 'https://placehold.co/600x400?text=Pic1',
    thumbnail: 'https://placehold.co/320x240?text=Thumb1',
    description: 'This is a placeholder picture.',
    created_at: '2024-01-07T20:49:34.000Z',
    filesize: 170469,
    media_type: 'image/jpeg',
  },
  {
    media_id: 2,
    title: 'Picture 2',
    filename: 'https://placehold.co/600x400?text=Pic2',
    thumbnail: 'https://placehold.co/320x240?text=Thumb2',
    description: 'Another placeholder picture.',
    created_at: '2024-01-07T21:32:27.000Z',
    filesize: 1002912,
    media_type: 'image/jpeg',
  },
  {
    media_id: 3,
    title: 'Bunny Video',
    filename:
      'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    thumbnail: 'https://placehold.co/320x240?text=Thumb3',
    description: 'Butterflies fly around the bunny.',
    created_at: '2024-01-07T20:48:13.000Z',
    filesize: 1236616,
    media_type: 'video/mp4',
  },
];

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </>
  );
};

export default Home;
