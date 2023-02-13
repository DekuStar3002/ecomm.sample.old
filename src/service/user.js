const { User, Product } = require('../../database/models');
const { CustomError, passwordUtil, tokenUtil } = require('../util');

const createUser = async ({ name, email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if(user) {
    throw new CustomError(400, 'Email Already Used');
  }
  const hashedPassword = await passwordUtil.hashPassword(password);
  return User.create({ name, email, password: hashedPassword });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if(!user) {
    throw new CustomError(400, 'Email not found');
  }
  const isPassword = await passwordUtil.checkPassword(password, user.password);
  if(!isPassword) {
    throw new CustomError(400, 'Wrong password');
  }
  return tokenUtil.createToken({ id: user.id, name: user.name, email: user.email, type: 'user' });
};

const getAllProducts = async () => {
  return await Product.findAll();
};

const addProductToCart = async (userId, productName) => {
  const product = await Product.findOne({ where: { name: productName } });
  if(!product) {
    throw new CustomError(400, 'Product not found');
  }
  const user = await User.findOne({ where: { id: userId } });
  if(!user) {
    throw new CustomError(400, 'User not found');
  }
  user.dataValues.cart.push(product.dataValues.id);
  await User.update({ cart: user.dataValues.cart }, { where: { id: user.dataValues.id } });
  return user.dataValues.cart;
};

module.exports = { createUser, loginUser, getAllProducts, addProductToCart };