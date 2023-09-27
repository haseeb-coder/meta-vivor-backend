import express from "express";


import AdminController  from  "../controller/index"
const  AdminRouter  = express.Router();

AdminRouter.post('/register', AdminController.handleRegisterAdmin)
AdminRouter.post('/login', AdminController.handleLoginAdmin)
AdminRouter.post('/forgot-password', AdminController.handleForgetPassword)
AdminRouter.post('/reset-password/:token', AdminController.handleResetPassword);


export  default AdminRouter;
