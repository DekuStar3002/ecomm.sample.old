const { adminService } = require('../service');
const { CustomError } = require('../util');
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json({
      name: newAdmin.name,
      email: newAdmin.email,
      type: 'admin'
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

const loginAdmin = async (req, res) => {
  try {
    const token = await adminService.loginAdmin(req.body);
    res.status(200).json({
      token: token,
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

const addProduct = async (req, res) => {
  try {
    const type = req.decoded.type;
    if(type !== 'admin')
      throw new CustomError(403, 'Only admin allowed to perform the operation');
    const product = await adminService.addProduct(req.decoded.id, req.body.name);
    res.status(200).json({
      product: product,
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

module.exports = { createAdmin, loginAdmin, addProduct };