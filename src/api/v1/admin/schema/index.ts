import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  adminname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  resetToken: {type: String, default:null },
  resetTokenExpiration: {type: Date, default:null},
  newPassword: {type: String, required: false},
  confirmPassword: {type: String, required: false},
});

export default mongoose.model('Admin', AdminSchema);
