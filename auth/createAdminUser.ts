import bcryptjs from 'bcryptjs';
import {MongoClient, MongoClientOptions} from 'mongodb';

const createAdminUser = async () => {
  const adminUser = {
    username: 'admin',
    password: await bcryptjs.hash('Admin@123', 10), // Replace with a secure password
    email: 'haseebsiddique26@gmail.com', // Replace with an actual email address
  };

  const mongodbConnectionURL = process.env.MONGODB_CONECTION_URL;

  if (!mongodbConnectionURL) {
    throw new Error('MONGODB_CONECTION_URL environment variable is not set.');
  }

  const clientOptions: MongoClientOptions = {};

  const client = new MongoClient(mongodbConnectionURL, clientOptions);

  try {
    await client.connect();
    const collection = client.db('your_database_name').collection('users');
    await collection.insertOne(adminUser);
    //eslint-disable-next-line
    console.log('Admin user created successfully');
  } finally {
    client.close();
  }
};

export default createAdminUser;
