
const sharp = require('sharp')
const multer= require('multer')
const { Tour } = require('../models/tourModel');
const appError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');


const multerStorage= multer.memoryStorage();
const multerFilter= (req,file,cb)=>{
  
  if(file.mimetype.startsWith('image')) {
    cb(null,true)
  }
  else{
    cb(new appError('it is not an image please uplaod an image',400))
  }
}
const upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

exports.uploadTourPhoto = upload.fields([
  {name:'imageCOver', maxCount:1},
  {name:'images', maxCount:3}
]);

exports.resizeTourPhoto = catchAsync( async(req,res,next) =>{

  if(!req.files.imageCover || req.files.images) return next();
  req.body.coverImage= `tour-${req.params.id}-${Date.now()}-cover.jpeg`

  await sharp(req.files.imageCover[0].buffer)
  .resize(2000,1333)
  .toFormat('jpeg')
  .jpeg({quality: 90})
  .toFile(`public/images/tours/${req.body.coverImage}`);

  req.body.images =[];

  await Promise.all(req.files.map( async(file,i) =>{
    const filename =`tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`

    
    await sharp(file.buffer)
    .resize(2000,1333)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(`public/images/tours/${filename}`);

    req.body.images.push(filename)
  }))

  next();
});


exports.createTour = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const created = await Tour.create(req.body);

  res.status(200).json({
    status: true,
    data: created,
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: true,
    results: tours.length,
    data: {
      tours,
    },
  });
});


exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id) 
  res.status(200).json({
    status: true,
    message: 'successfully deleted',
  });
});


exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');
  res.status(200).json({
    status: true,
    data: {
      tour,
    },
  });
});


exports.updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: true,
    data: {
      updatedTour,
    },
  });
});
