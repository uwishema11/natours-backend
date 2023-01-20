
const express =require('express');
const reviewController =require('./../controllers/reviewController');
const isAuth = require('../middleware/authMiddleware');
const router =express.Router({mergeParams: true});

router.route('/')
.get(isAuth.Protect,reviewController.getAllRevieww)
.post(isAuth.Protect,reviewController.createReview)

module.exports= router