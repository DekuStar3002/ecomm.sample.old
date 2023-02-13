const express = require('express');
const router = express.Router();
const route = require('./route');
router.use('/admin', route.adminRouter);
router.use('/user', route.userRouter);
module.exports = router;