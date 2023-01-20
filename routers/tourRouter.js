const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const tourController = require('../controllers/tourController');
const reviewRouter =require('../routers/reviewRouter');

const router = express.Router();

router.use('/:tourId/reviews',reviewRouter)

router.route('/')
.get(isAuth.Protect, tourController.getAllTours)
.post(isAuth.Protect, isAuth.Restricted('admin', 'lead-guide'), tourController.createTour);

router
  .route('/:id')
  .delete(isAuth.Protect, isAuth.Restricted('admin', 'lead-guide'), tourController.deleteTour)
  .patch(isAuth.Protect,isAuth.Restricted('admin', 'lead-guide'),tourController.updateTour)
  .get(isAuth.Protect,tourController.getTour);

module.exports = router;
