import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Configure CORS with specific origin and methods
app.use(
  cors({
    origin: 'https://front-alpha-ruby.vercel.app', // Removed trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Removed the duplicate root route
app.get('/', (request, response) => {
  console.log('Welcome request made to root');
  return response.status(200).send('Welcome To Book APP');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
