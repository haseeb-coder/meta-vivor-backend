import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import Admin from '../schema/index';
import { AdminBody } from '../interface/index';

class AdminService {
  static async registerAdmin(body: AdminBody) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newAdmin = new Admin({
        adminname: body.adminname,
        email: body.email,
        password: hashedPassword,
      });
      await newAdmin.save();
      return newAdmin;
    } catch (err) {
      throw new Error('Failed to register admin');
    }
  }

  static async loginAdmin(email: string, password: string) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error('Invalid credentials');
      }
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }
      return admin;
    } catch (err) {
      throw new Error('Failed to login admin');
    }
  }



  static async findAdminByEmail(email: string) {
    try {
      const admin = await Admin.findOne({ email });
      return admin;
    } catch (err) {
      throw new Error('Failed to check email existence');
    }
  }
  
  static async forgotPassword(email: string) {
    try {
      // Generate a unique reset token (e.g., a UUID)
      const resetToken = uuidv4();
      // Set the expiration time for the reset token (e.g., 1 hour from now)
      const resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
      await Admin.updateOne(
        { email },
        {
          $set: {
            resetToken,
            resetTokenExpiration,
          },
        },
      );
      return resetToken;
    } catch (error) {
      throw new Error('Failed to initiate password reset');
    }
  }

  static async resetPassword(token: string, newPassword: string, confirmPassword: string) {
    try {
      // Find the admin by the reset token
      const admin = await Admin.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });

      if (!admin) {
        throw new Error('Invalid or expired reset token');
      }

      // Check if newPassword matches confirmPassword
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Update the admin's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      admin.resetToken = '';
      admin.resetTokenExpiration = new Date();
      await admin.save();
    } catch (error) {
      throw new Error('Failed to reset password');
    }
  }
}

export default AdminService;
