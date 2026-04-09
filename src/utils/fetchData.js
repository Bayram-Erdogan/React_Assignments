const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Fetch failed');
  }

  const data = await response.json();
  return data;
};

export default fetchData;
