import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, statusCode = 200) => {
  const tokenID = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", tokenID, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};



 /* sameSite:none means If server and client are in same site this setting will not allow cookie to be passed from server to client 
  browser.PostMan as a client will not recieve any cookie as a response from a server if we initiated a request.This config is used for 
  deployments. */


   /* sameSite:lax means If server and client are in same site this will allow cookie to be passed from server to client 
  browser.PostMan as a client will  recieve any cookie as a response from a server if we initiated a request.This config is used for
  development  and testing  */
