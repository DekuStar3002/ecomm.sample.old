const router = require('express').Router();
const Joi = require('joi');
const { adminController } = require('../controller');
const middleware = require('../middleware');

const schemaForCreateAdmin = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaForLoginAdmin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaToCreateProduct = Joi.object({
  name: Joi.string().required(),
});

router.post('/create', middleware.bodyValidator(schemaForCreateAdmin), adminController.createAdmin);
router.post('/login', middleware.bodyValidator(schemaForLoginAdmin), adminController.loginAdmin);
router.post('/product', middleware.bodyValidator(schemaToCreateProduct), middleware.verifyToken, adminController.addProduct);
module.exports = router;