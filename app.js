import express from 'express';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: true,
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// ? Internal Routers

export default app;
