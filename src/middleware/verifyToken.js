const { tokenUtil, CustomError } = require('../util');
const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if(!bearerHeader) {
      res.status(400).json({
        error: 'unable to find token'
      });
      return;
    }
    const token = bearerHeader.split(' ')[1];
    const type = req.originalUrl.split('/')[2];
    const decoded = await tokenUtil.verifyToken(type, token);
    req.decoded = decoded;
    next();
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
    return;
  }
};

module.exports = verifyToken;