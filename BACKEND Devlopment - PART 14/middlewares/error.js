// Amar - I will explore custom error handling online - Later

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server error"; //If err.message on the right is empty "" then the error strings next to it will be stored in err.message to the left.
  res.status(404).json({
    success: false,
    message: err.message,
  });
};
