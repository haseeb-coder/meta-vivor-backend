import express from 'express';
import cors from 'cors';

import AdminRouter from "./src/api/v1/admin/router/index";
import UserRouter from './src/api/v1/user/router';
import SurveyRouter from './src/api/v1/survey/router';

const app = express();
const corsOptions = {
  origin: true,
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// ? Internal Routers
app.use ('/api/v1/admin', AdminRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/surveys', SurveyRouter);

export default app;
