import { useCallback, useEffect, useState } from 'react';
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

  const postMedia = async (file, inputs, token) => {
    const mediaPayload = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaPayload),
    };

    const mediaResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media`,
      fetchOptions
    );

    return mediaResult;
  };

  const deleteMedia = async (mediaId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const deleteResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${mediaId}`,
      fetchOptions
    );

    return deleteResult;
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    };

    const modifyResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${mediaId}`,
      fetchOptions
    );

    return modifyResult;
  };

  return { mediaArray, postMedia, deleteMedia, modifyMedia };
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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const fileResult = await fetchData(
      `${import.meta.env.VITE_UPLOAD_SERVER}/upload`,
      fetchOptions
    );

    return fileResult;
  };

  return { postFile };
};

const useLike = () => {
  const getLikeCountByMediaId = useCallback(async (mediaId) => {
    const likeCountResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/count/${mediaId}`
    );

    return likeCountResult;
  }, []);

  const getLikeByUser = useCallback(async (mediaId, token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const likeResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/bymedia/user/${mediaId}`,
      fetchOptions
    );

    return likeResult;
  }, []);

  const postLike = useCallback(async (mediaId, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ media_id: mediaId }),
    };

    const likeResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes`,
      fetchOptions
    );

    return likeResult;
  }, []);

  const deleteLike = useCallback(async (likeId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const deleteResult = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/${likeId}`,
      fetchOptions
    );

    return deleteResult;
  }, []);

  return { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser };
};

export { useMedia, useAuthentication, useUser, useFile, useLike };
