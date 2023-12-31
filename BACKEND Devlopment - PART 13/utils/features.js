import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, statusCode = 200) => {
  const tokenID = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", tokenID, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
