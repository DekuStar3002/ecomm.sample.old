const bodyValidator = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({
      error: error.message
    });
  }
  next();
};

module.exports = bodyValidator;