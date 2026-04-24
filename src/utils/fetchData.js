const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    // Hata mesajına status kodunu ekle
    throw new Error(`Fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default fetchData;
