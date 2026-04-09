import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';

const useMedia = () => {
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
    const timeoutId = window.setTimeout(() => {
      void getMedia();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      `${import.meta.env.VITE_AUTH_API}/auth/login`,
      fetchOptions
    );

    return loginResult;
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const userResult = await fetchData(
      `${import.meta.env.VITE_AUTH_API}/users/token`,
      fetchOptions
    );

    return userResult;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const registerResult = await fetchData(
      `${import.meta.env.VITE_AUTH_API}/users`,
      fetchOptions
    );

    return registerResult;
  };

  return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
