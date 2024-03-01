import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
<<<<<<< HEAD

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Book APP ');
  });
=======
app.get("/", (req, res) => {
    res.json("Welcome To Book APP");
})
>>>>>>> 19a6fe7273e062cb1dbfdc4b28782dcc4d33b160

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
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 19a6fe7273e062cb1dbfdc4b28782dcc4d33b160
