const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter')
const AppError = require('./utils/appError');
const globalErrorHandle = require('./utils/errorController');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandle);

module.exports = app;
