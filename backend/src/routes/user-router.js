const express = require ('express');
const userController = require('../controllers/user-controller');
const userRouter = express.Router();

userRouter.get('/getUserData', userController.getUserData);
userRouter.delete('/deleteUserData', userController.deleteUserData);

module.exports = userRouter;