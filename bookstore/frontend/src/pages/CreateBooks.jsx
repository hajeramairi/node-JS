import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear: publishYear ? Number(publishYear) : undefined,
    };
    setLoading(true);
    axios
      .post('https://back-ten-zeta.vercel.app/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book', { variant: 'error' });
        console.error('Error creating book:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading && <Spinner />}
      <form className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSaveBook}>
        <label htmlFor='title' className='text-xl mr-4 text-gray-500'>Title</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          placeholder='Enter book title'
          required
        />
        <label htmlFor='author' className='text-xl mr-4 text-gray-500'>Author</label>
        <input
          id='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          placeholder='Enter author name'
          required
        />
        <label htmlFor='publishYear' className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input
          id='publishYear'
          type='number'
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          placeholder='Enter publish year'
          required
        />
        <button type='submit' className='p-2 bg-sky-300 m-8' disabled={loading}>
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateBooks;
