import { useState } from 'react';
import { useNavigate } from 'react-router';
import useForm from '../hooks/formHooks';
import { useMedia, useFile } from '../hooks/apiHooks';

const Upload = () => {
  const navigate = useNavigate();
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const [file, setFile] = useState(null);

  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      if (!file) {
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: { pathname: '/upload' } } });
        return;
      }

      const fileResult = await postFile(file, token);
      const uploadedFile = fileResult.data ?? fileResult;
      await postMedia(uploadedFile, inputs, token);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doUpload,
    initValues
  );

  return (
    <>
      <h1>Upload</h1>
      <form
        className="mx-auto flex max-w-2xl flex-col gap-4 text-left"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-(--text-h)" htmlFor="title">
            Title
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-(--text-h)" htmlFor="description">
            Description
          </label>
          <textarea
            className="min-h-32 rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit outline-none transition focus:border-(--accent-border) focus:ring-2 focus:ring-(--accent-bg)"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-(--text-h)" htmlFor="file">
            File
          </label>
          <input
            className="rounded-lg border border-(--border) bg-white px-4 py-3 text-inherit file:mr-4 file:rounded-md file:border-0 file:bg-(--accent-bg) file:px-3 file:py-2 file:font-medium file:text-(--text-h)"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          className="w-56 rounded-2xl border border-(--border) shadow-(--shadow)"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
        />
        <button
          className="inline-flex w-fit items-center justify-center rounded-lg bg-(--accent) px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={!file || inputs.title.trim().length < 3}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
