// Custom error class - Error Handling



class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message,
  });
};

export default CustomErrorHandler;


// Why use a custom error class ?

// The built-in Error object in JavaScript only has:
// message
// stack
// It doesn’t store an HTTP status code or any extra data.

// A custom error class extends Error so you can include:
// statusCode (e.g., 404, 401, 500)
// Custom properties (e.g., errors array for validation issues)

// A cleaner, consistent way to throw errors
