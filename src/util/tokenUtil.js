const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const redisUtil = require('./redisUtil');
const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET);
  await redisUtil.setTokenToRedis(payload.type, token);
  return token;
};

const verifyToken = async (type, token) => {
  const redisToken = await redisUtil.getTokenFromRedis(type);
  if(redisToken !== token)
    throw new CustomError(400, 'Invalid Token');
  return await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if(error || !decoded)
      throw new CustomError(400, 'Error In docoding token');
    return decoded;
  });
};

module.exports = { createToken, verifyToken };