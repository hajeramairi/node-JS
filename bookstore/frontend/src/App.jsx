import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      publishYear: Number(publishYear), // Ensure publishYear is sent as a Number
    };

    axios.post('https://back-seven-gilt.vercel.app', bookData)
      .then(response => {
        console.log('Book Created:', response.data);
        // Optionally reset form fields or redirect the user
      })
      .catch(error => console.error('There was an error creating the book:', error));
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
