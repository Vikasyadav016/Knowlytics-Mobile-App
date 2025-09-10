const rateLimit = require('express-rate-limit');

// Create a function that returns a rate limiter with custom options
function createRateLimiter({ windowMs, maxRequests, message }) {
  return rateLimit({
    windowMs: windowMs || 15 * 60 * 1000, // default 15 minutes
    max: maxRequests || 100,               // default max 100 requests per windowMs
    message: message || 'Too many requests from this IP, please try again later.',
    standardHeaders: true,  // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,   // Disable the `X-RateLimit-*` headers
  });
}



const rateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  maxRequests: 5,
  message: 'Too many registration attempts from this IP, please try again after 10 minutes.',
});

module.exports = rateLimiter;


// use like this
// router.use('/v1/register', registerLimiter);

