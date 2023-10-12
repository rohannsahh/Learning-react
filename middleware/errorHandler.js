// not found

const notFound = (req, res, next) => {
  // Create an error object with a custom error message
  const error = new Error(`Not Found: ${req.originalUrl}`);

  // Set the HTTP status code to 404 (Not Found)
  res.status(404);

  // Pass the error object to the next middleware
  next(error);
};


//error handler

const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code to send in the response
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

  // Set the HTTP status code of the response
  res.status(statusCode);

  // Send a JSON response with error information
  res.json({
    message: err?.message, // The error message
    stack: err?.stack,     // The error stack trace (if available)
  });
};


export {errorHandler,notFound}
