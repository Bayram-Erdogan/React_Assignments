const SingleView = ({ item, setSelectedItem }) => {
  if (!item) return null;

  return (
    <dialog open={!!item}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.media_type.includes('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls src={item.filename}></video>
      )}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

export default SingleView;
