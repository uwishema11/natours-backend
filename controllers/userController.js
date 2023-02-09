
const multer =require('multer');
const sharp = require('sharp')
const appError = require('../utils/appError');
const { User } = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');



// const multerStorage= multer.diskStorage({
//   destination: (req,file,cb) =>{
//     cb(null,'public/images/users')
//   },
//   filename: (req,file,cb)=>{
//     const ext =file.mimetype.split('/')[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })

const multerStorage= multer.memoryStorage();

const multerFilter =(req,file,cb)=>{
   if(file.mimetype.startsWith(image)){
    cb(null,true)
   }else{
    cb(new appError('not ana Image! please uplaod an image.',400), false)
   }
}

const uplaod =multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

 exports.uplaodUserPhoto =uplaod.single('photo');

 exports.resizeUserPhoto =(req,res,next) =>{
  if(!req.file) return next;

  req.file.filename =`user-${req.user.id}-${Date.now()}.jpeg`
  sharp(req.file.buffer)
  .resize(500,500)
  .toFormat('jpeg')
  .jpeg({quality: 90 })
  .toFile(`public/images/users/${req.file.filename}`)
  
  next();
 }

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
  if (req.file) filteredBody.photo =req.file.filename

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
