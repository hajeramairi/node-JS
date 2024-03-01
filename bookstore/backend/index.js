import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
//app.use(cors());
app.use(
     cors({
       origin: 'https://front-alpha-ruby.vercel.app/',
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
       allowedHeaders: ['Content-Type'],
     })
   );


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Book APP ');
  });

app.get("/", (req, res) => {
    res.json("Welcome To Book APP");
})

  app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
