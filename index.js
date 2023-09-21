import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';

const port = process.env.PORT || 8000;

dotenv.config();
mongoose.set('strictQuery', false);

app.get("/", (req, res) => {
  res.send("Metavivor is available");
});

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //eslint-disable-next-line
    console.log('Mongodb connection established');
  } catch (err) {
    //eslint-disable-next-line
    console.log('Error while connectoing to database');
  }
};

app.listen(port, () => {
  conectDB();
  //eslint-disable-next-line
  console.log('server listening on port ' + port);
});
