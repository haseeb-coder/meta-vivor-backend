import express from 'express';

import UserController from '../controller/index';

const UserRouter = express.Router();

UserRouter.post('/create', UserController.handlecreateUser);
UserRouter.get('/all', UserController.handlegetAllUsers);

export default UserRouter;
