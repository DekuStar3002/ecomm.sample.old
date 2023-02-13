const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('error', (error) => console.log(error));

const setTokenToRedis = async (type, token) => {
  redisClient.connect();
  await redisClient.set(`${type}JwtToken`, token);
  redisClient.disconnect();
}; 

const getTokenFromRedis = async (type) => {
  redisClient.connect();
  const token = await redisClient.get(`${type}JwtToken`);
  redisClient.disconnect();
  return token;
};

module.exports = { setTokenToRedis, getTokenFromRedis };