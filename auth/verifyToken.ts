import jwt from 'jsonwebtoken';

function generateJwtToken(user) {
  const payload = {
    userId: user._id,
  };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const options = {
    expiresIn: '1h', // Token expires in 1 hour
  };
  return jwt.sign(payload, secretKey, options);
}

export default generateJwtToken;
