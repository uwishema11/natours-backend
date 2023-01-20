
const Review = require('./../models/reviewModel')
const catchAsync = require('../utils/catchAsync');




exports.createReview = catchAsync(async(req,res,next)=>{
    if(!req.body.tour) req.body.tour= req.params.tourId
    if(!req.body.user) req.body.user =req.user.id
    const newReview =await Review.create(req.body)

    res.status(200).json({
        success:true,
        data: {
            Review:newReview
        }
    })
});

// getting all reviews

exports.getAllRevieww= catchAsync(async(req,res,next)=>{

    let filter={};
    if(req.params.tourId) filter= {tour:req.params.tourId}
    const reviews =await Review.find(filter);
    res.status(200).json({
        success:true,
        results: reviews.length,
        data :{
            reviews
        }
    })
})