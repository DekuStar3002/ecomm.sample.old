const bcrypt = require('bcrypt');

const { SALT_ROUND } = require('../constant');
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUND);
};

const checkPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = { hashPassword, checkPassword };