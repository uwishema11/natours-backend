const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/authMiddleware');
const tourController = require('../controllers/tourController');

router.route('/').get( tourController.getAllTours).post(tourController.createTour);

router
  .route('/:id')
  .delete(tourController.deleteTour)
  // .delete(isAuth.Protect, isAuth.Restricted('admin', 'lead-guide'), tourController.deleteTour)
  .patch(tourController.updateTour)
  .get(tourController.getTour);

module.exports = router;
