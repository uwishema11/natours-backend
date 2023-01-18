const express = require('express');

const router = express.Router();
const userController = require('./../controllers/userController');
const isAuth = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', isAuth.Protect, authController.updatePassword);
router.patch('/updateMe', isAuth.Protect, userController.updateMe);
router.post('/login', authController.login);
router.get('/', userController.getAllUsers);

//  router.route('/')
//  .get(userController.getAllUsers)
//  .post(userController.createUser);

//  router.route('/:id')
//  .delete(userController.deleteUser)
//  .patch(userController.updateUser)
//  .get(userController.getUser)

module.exports = router;
