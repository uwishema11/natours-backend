// const jwt= require('jsonwebtoken')
// const {User,userAuthSchema}= require('./../models/userModel');
// const catchAsync= require('./../utils/catchAsync')

// exports.signUp = catchAsync(async(req,res,next)=>{
// const results = await userAuthSchema.validate(req.body);
// const{error} =results;
// if(error) return res.status(400).json({
//     message:error.message
// });

// //     const newUser= await User.create({
// //         firstName:req.body.firstName,
// //         lastName:req.body.lastName,
// //         password:req.body.password,
// //         passwordConfirm:req.body.passwordConfirm
// //     });
// //     const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{
// //        expiresIn:process.env.JWT_EXPIRES_IN
// //     });

// //     res.status(200).json({
// //         status:true,
// //         token,
// //         data:{
// //            user:newUser
// //         }
// //     });
// // });

// // exports.login = (req,res,next)=>{
// //     const {email,password}= req.bod;

// //     //check if email  and password exist
// //     if(!email || !password){

// //     }
// //     //database && password is correct
// // }
// const mongoose =require('mongoose');
// const validator = require('validator');
// const joi = require('joi')
// const bcrypt = require('bcrypt')

// const userSchema = new mongoose.Schema({
//     firstName :{
//         type:String,
//         required:true
//     },
//     lastname :{
//         type:String,
//         required:true
//     },
//     email :{
//         type:String,
//     //     required:true,
//     //     lowerCase:true,
//     //     unique:true,
//     //    validate :[validator.isEmail, 'please provide a valid email']
//     },
//     password:{
//         type:String,
//         min:8,
//         required:true
//     },
//     passwordConfirm:{
//         type:String,
//         required:true,
//         validate:{
//             validator : function(el){
//                 return el===this.password
//             }
//         }
//     },
//     photo :String

// });

// const userAuthSchema =joi.object({
//     firstName:joi.string().required(),
//     lastname:joi.string().required(),
//     email:joi.string().email().required(),
//     password:joi.string().min(8).required(),
//     passwordConfirm: joi.ref("password",)

//  })

// userSchema.pre('save', async function(next){

//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password,12);
//     this.passwordConfirm =null;
//     next();
// })

// const User = mongoose.model('User',userSchema);
// module.exports =User,
// module.exports.userAuthSchema=userAuthSchema
