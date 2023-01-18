const { Tour } = require('../models/tourModel');

const catchAsync = require('../utils/catchAsync');

exports.createTour = catchAsync(async (req, res, next) => {

  const created = await Tour.create(req.body);

  res.status(200).json({
    status: true,
    data: created,
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  console.log(req.headers);
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
  await Tour.findByIdAndDelete(req.params.id);
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
