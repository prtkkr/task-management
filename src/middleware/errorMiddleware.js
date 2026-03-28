import CustomError from '../utils/CustomError.js';

export const unmatchedRouteHandler = (req, res, next) => {
  throw new CustomError(`Invalid endpoint`, 404);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;
  // res.status(err.statusCode || 500).json({
  //   status: statusCode < 500 ? false : 'error',
  //   message: err.message || 'Internal Server Error',
  // });
  res.status(statusCode).json({
    status: statusCode < 500 ? false : 'error',
    message,
  });
};
