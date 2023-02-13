const { Admin, Product } = require('../../database/models');
const { CustomError, passwordUtil, tokenUtil } = require('../util');

const createAdmin = async ({ name, email, password }) => {
  const admin = await Admin.findOne({ where: { email: email } });
  if(admin) {
    throw new CustomError(400, 'Email Already Used');
  }
  const hashedPassword = await passwordUtil.hashPassword(password);
  return Admin.create({ name, email, password: hashedPassword });
};

const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ where: { email: email } });
  if(!admin) {
    throw new CustomError(400, 'Email not found');
  }
  const isPassword = await passwordUtil.checkPassword(password, admin.password);
  if(!isPassword) {
    throw new CustomError(400, 'Wrong password');
  }
  return tokenUtil.createToken({ id: admin.id, name: admin.name, email: admin.email, type: 'admin' });
};

const addProduct = async (adminId, productName) => {
  const product = await Product.findOne({ where: { name: productName } });
  if(product) {
    throw new CustomError(400, 'Product already added');
  }
  const admin = await Admin.findOne({ where: { id: adminId } });
  if(!admin) {
    throw new CustomError(400, 'Admin not found');
  }
  const newProduct = await Product.create({ name: productName });
  admin.dataValues.product.push(newProduct.dataValues.id);
  await Admin.update({ product: admin.dataValues.product }, { where: { id: admin.dataValues.id } });
  return newProduct;
};

module.exports = { createAdmin, loginAdmin, addProduct };