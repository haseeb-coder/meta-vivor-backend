import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'; // extra step may be removed latter
const configureTransporter = () => {
  const transporter = nodemailer.createTransport(smtpTransport({
    host:'solutionsloft.com',     // extra step may be removed latter
    secure: false,      // extra step may be removed latter
    tls: {
      rejectUnauthorized: false
    },
    port: 587,                    // extra step may be removed latter
    // service: 'Gmail',
    auth: {
      user: process.env.ORGANIZATION_EMAIL, 
      pass: process.env.ORGANIZATION_PASSWORD, 
    },
  }));

  return transporter;
};

export default configureTransporter;
