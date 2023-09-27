export interface AdminBody {
    adminname: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiration?: Date;
    newPassword?: string;
    confirmPassword?: string;
  }
  