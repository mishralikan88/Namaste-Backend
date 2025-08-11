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




// Code Explanation -

// .cookie("token", tokenID, {
//     httpOnly: true,
//     maxAge: 15 * 60 * 1000,
//     sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
//     secure: process.env.NODE_ENV === "Development" ? false : true,
//   })


// 1. "token"
// This is the cookie name.Browsers will store it as token=... in their cookie storage.
// You'll use this name to read the cookie later (e.g., req.cookies.token).


// 2. tokenID
// This is the cookie value.In our case, it's the JWT you generated:
// const tokenID = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
// Browsers will store something like: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


// 3. httpOnly: true
// The point of httpOnly: true is to protect your cookie from being stolen by malicious JavaScript running in the browser.
// When a server sets a cookie with httpOnly: true, the browser stores it and you can still view it in DevTools, but JavaScript (document.cookie) cannot read or modify it. This prevents XSS attacks from stealing sensitive data like JWTs. 
// Only the server (using Set-Cookie) or the user (through browser tools) can change the cookie & the browser will send it automatically with any request that matches its rules.

// 4. maxAge: 15 * 60 * 1000
// How long the cookie lives (in milliseconds).
// 15 * 60 * 1000 = 900,000 ms = 15 minutes.
// After 15 mins, the browser will automatically delete the cookie → user session expires.
// Short expiry = better security, but may require re-login more often.



// 5. sameSite

// sameSite - lax

// Step 1 — What a cookie does
// When you log in to myshop.com, the browser gets a cookie like:
// token=abc123
// That cookie is proof you are logged in.
// Every time you visit myshop.com, the browser attaches the cookie so the server knows it’s you.

// Step 2 — What sameSite: "lax" changes
// This setting tells the browser: "Only send this cookie if the request is coming directly from my site, or from you clicking a normal link from another site."


// Case 1 — Request coming from my site
// You’re already on myshop.com.
// You click a button or go to another page inside myshop.com.
// Browser sends the cookie to the server so it knows you’re still logged in.

// Case 2 — You click a link from another site
// You’re on blog.com.
// You see a link: "Visit MyShop" → you click it.
// The browser opens myshop.com.
// Browser sends the cookie so myshop.com knows you're logged in.

// ❌ When cookie is NOT sent in lax
// You're on evil.com.The site secretly tries to place an order at myshop.com without you clicking anything.
// Browser does not send the cookie → myshop.com thinks you’re not logged in → action fails.

// Think of "lax" like this:
// "Send the cookie only when I’m on my site or when the person clicked a real link to my site — not for any sneaky background stuff"

// =================================================================================================================

// sameSite: "none" — When the cookie is sent

// Case 1 — Request coming from my site
// You’re on myshop.com.
// You go to another page or click a button.
// Browser sends the cookie.

// Case 2 — You click a link from another site
// You’re on blog.com.
// You click a link to myshop.com.
// Browser sends the cookie.

// Case 3 — Another site makes a request to my site
// You’re on partner.com or evil.com.
// They send a request (form, fetch, anything) to myshop.com.
// Browser still sends the cookie.
// Think of "none" like this:
// "Send the cookie no matter where the request comes from — my site, a clicked link, or even another site’s background request."
// Important: For "none", browsers require secure: true → must be HTTPS, or the cookie will be blocked.


// 6. secure flag — What it means - It tells the browser: "Only send this cookie over a safe connection (HTTPS)."

// secure: true
// Cookie will only be sent if the website address starts with https: // (secure connection).
// If it's http:// (no "s"), cookie will not be sent.
// This keeps your cookie safe from hackers who might try to steal it on public Wi-Fi.
// Example:
// https://myshop.com → ✅ cookie sent
// http://myshop.com → ❌ cookie not sent

// secure: false
// Cookie can be sent over both HTTPS and HTTP.
// Less safe because HTTP is not encrypted — someone could steal the cookie in transit.
// Used mostly for local development where you don’t have HTTPS.

// secure: true → "Only travel in a locked, bulletproof car."
// secure: false → "Can travel in any car, even unsafe ones — fine for local roads (localhost), risky on the highway (internet).""