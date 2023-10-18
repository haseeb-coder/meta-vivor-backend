import configureTransporter from './configureTransportmailer';

async function sendPasswordResetEmail(email: string, resetToken: string) {
  const transporter = configureTransporter();

  // Construct the reset password URL
  const resetPasswordUrl = `http://localhost:3000/change-password?token=${resetToken}`;

  // Compose the email
  const mailOptions = {
    from: process.env.ORGANIZATION_EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetPasswordUrl}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    //eslint-disable-next-line
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

export default sendPasswordResetEmail;

