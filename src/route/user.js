const router = require('express').Router();
const Joi = require('joi');
const { userController } = require('../controller');
const middleware = require('../middleware');

const schemaForCreateUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaForLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaToAddToCart = Joi.object({
  name: Joi.string().required(),
});

router.post('/create', middleware.bodyValidator(schemaForCreateUser), userController.createUser);
router.post('/login', middleware.bodyValidator(schemaForLoginUser), userController.loginUser);
router.post('/product', middleware.verifyToken, middleware.bodyValidator(schemaToAddToCart), userController.addProductToCart);
router.get('/products', middleware.verifyToken, userController.getAllProducts);
module.exports = router;