export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  res.status(404).json({
    success: false,
    message: err.message,
  });
};
