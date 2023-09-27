import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

const port = process.env.PORT || 5000;

dotenv.config();
mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
  res.send('Metavivor is available');
});

const connectDB = async () => {
  try {
    const mongodbConnectionURL = process.env.MONGODB_CONECTION_URL;
    if (!mongodbConnectionURL) {
      throw new Error('MONGODB_CONECTION_URL environment variable is not set.');
    }

    await mongoose.connect(mongodbConnectionURL);

    //eslint-disable-next-line
    console.log('Mongodb connection established');
  } catch (err) {
    //eslint-disable-next-line
    console.error('Error while connecting to the database:', err);
  }
};

app.listen(port, () => {
  connectDB();
  //eslint-disable-next-line
  console.log('Server listening on port ' + port);
});
