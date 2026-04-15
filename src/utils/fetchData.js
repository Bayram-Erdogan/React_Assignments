const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Fetch failed');
  }

  const data = await response.json();
  return data;
};

export default fetchData;
