export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message,
  });
};
