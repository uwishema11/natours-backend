const { userAuthSchema, User, loginAuthSchema } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authToken = require('../helpers/generatetoken');

exports.signUp = catchAsync(async (req, res, next) => {
  const results = await userAuthSchema.validate(req.body);
  const { error } = results;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: 'user Already exist',
    });
  }

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = authToken(newUser._id);

  res.status(200).json({
    status: true,
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // check if the email and password exist
  const { email, password } = req.body;
  const value = await loginAuthSchema.validate(req.body);
  const { error } = value;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // check if a user exists in database and password is corrrect

  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: false,
      message: 'Incorect email or password',
    });
  }

  // if everything is ok, senf token to a client
  const token = authToken(user._id);

  res.status(200).json({
    status: true,
    token,
    message: 'logged in successfully',
  });
});

// Reset password functionality

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //validate the body
  const { email } = req.body;
  console.log(email);
  if (!email) {
    console.log('error');
    return res.status(400).json({
      status: 'fail',
      message: 'Email is not allowed to be null',
    });
  }

  // check if a user exists in database
  console.log('hello node js');
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'User is not registered',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'check your email for reset password link',
  });
});

exports.resetPassword = async (req, res, next) => {
  // Get user based on token
  // if token is has not expired and there is the user . set the new password
  // update the changed password property for the user
  // log the user in and send jwt
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from the collection

  const user = await User.findById(req.user.id).select('+password');

  // check if the posted current password is correct

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('your current password is wrong', 401));
  }

  // if so update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  // log the user in and send jwt
  res.status(200).json({
    success: true,
    message: 'password updated succesfully',
  });
});
