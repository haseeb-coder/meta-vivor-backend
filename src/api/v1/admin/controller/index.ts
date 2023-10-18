import {Request, Response} from 'express';

import createController from '../../../../utils/createController';
import sendPasswordResetEmail from '../../../../utils/emailConfigration/sendPasswordRestemail';
import generateJwtToken from '../../../../../auth/verifyToken';
import {AdminBody} from '../interface/index';
import AdminService from '../service/index';

class AdminController {
  static async handleRegisterAdmin(req: Request, res: Response) {
    return createController(res, async () => {
      const body: AdminBody = req.body;
      const admin = await AdminService.registerAdmin(body);
      return {message: 'Admin registered successfully', admin};
    });
  }

  static async handleLoginAdmin(req: Request, res: Response) {
    return createController(res, async () => {
      const {email, password} = req.body;
      const admin = await AdminService.loginAdmin(email, password);
      // Generate a JWT token and send it in the response.
      const token = generateJwtToken(admin);
      return {message: 'Login successful', admin, token};
    });
  }

  static async handleForgetPassword(req: Request, res: Response) {
    return createController(res, async () => {
      const { email } = req.body;
  
      if (!email) {
        return { message: 'Please provide a valid email address' };
      }
  
      const admin = await AdminService.findAdminByEmail(email);
  
      if (!admin) {
        return { message: `We couldn't find an account with this email` };
      }
  
      // If the email exists, generate a reset token and send a password reset email
      const resetToken = await AdminService.forgotPassword(email);
      const emailResponse = await sendPasswordResetEmail(email, resetToken);
  
      if (emailResponse.success) {
        return { message: emailResponse.message };
      } else {
        // Handle the case when sending the email fails
        return { message: 'Email could not be sent' };
      }
    });
  }
  
  static async handleResetPassword(req: Request, res: Response) {
    return createController(res, async () => {
      const {token} = req.params;
      const {newPassword, confirmPassword} = req.body;
      // Implement the logic to validate the reset token and update the password
      await AdminService.resetPassword(token, newPassword, confirmPassword);
      return {message: 'Password reset successful'};
    });
  }
}

export default AdminController;
