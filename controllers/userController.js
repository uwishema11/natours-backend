const appError = require('../utils/appError');
const { User } = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, net) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if a user posts password data

  if (req.body.password || req.body.confirmPassword) {
    return next(
      new appError('this route is not for password update .please use /updatePassword.', 400)
    );
  }

  // update user document
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    succes: true,
    data: {
      user: updatedUser,
    },
  });
});

// exports.deleteUser=(req,res)=>{
//     res.status(200).json({
//         success:true,
//     })
// };
// exports.getUser =(req,res)=>{
//     res.status(200).json({
//         success:true
//     })
// };
// exports.updateUser =(req,res)=>{
//     res.status(200).json({
//         success:true
//     })
// };
