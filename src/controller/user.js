const { userService } = require('../service');
const { CustomError } = require('../util');

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      type: 'user'
    });
  } catch (error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({
      token: token
    });
  } catch (error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await userService.getAllProducts();
    res.status(200).json({
      products: products
    });
  } catch (error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const type = req.decoded.type;
    if(type !== 'user')
      throw new CustomError(403, 'Only user allowed to perform the operation');
    const cart = await userService.addProductToCart(req.decoded.id, req.body.name);
    res.status(200).json({
      cart: cart
    });
  } catch (error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { createUser, loginUser, getAllProducts, addProductToCart };