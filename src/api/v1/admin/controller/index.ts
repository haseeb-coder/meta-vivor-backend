import { Request, Response } from 'express';

import createController from '../../../../utils/createController';
import sendPasswordResetEmail from '../../../../utils/emailConfigration/sendPasswordRestemail';
import generateJwtToken from '../../../../../auth/verifyToken';
import { AdminBody } from '../interface/index';
import AdminService from '../service/index';

class AdminController {
  static async handleRegisterAdmin(req: Request, res: Response) {
    return createController(res, async () => {
      const body: AdminBody = req.body;
      const admin = await AdminService.registerAdmin(body);
      return { message: 'Admin registered successfully', admin };
    });
  }

  static async handleLoginAdmin(req: Request, res: Response) {
    return createController(res, async () => {
      const { email, password } = req.body;
      const admin = await AdminService.loginAdmin(email, password);
      // Generate a JWT token and send it in the response.
      const token = generateJwtToken(admin);
      return { message: 'Login successful', admin, token };
    });
  }

  static async handleForgetPassword(req: Request, res: Response) {
    return createController(res, async () => {
      const { email } = req.body;
      const resetToken = await AdminService.forgotPassword(email);
      // Send a password reset email to the admin's registered email address
      await sendPasswordResetEmail(email, resetToken);
      return { message: 'Password reset email sent successfully' };
    });
  }

  static async handleResetPassword(req: Request, res: Response) {
    return createController(res, async () => {
      const { token } = req.params;
      const { newPassword, confirmPassword } = req.body;
      // Implement the logic to validate the reset token and update the password
      await AdminService.resetPassword(token, newPassword, confirmPassword);
      return { message: 'Password reset successful' };
    });
  }
}

export default AdminController;
