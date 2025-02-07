import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

// Limit each IP to 5 requests per second.
export const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  // eslint-disable-next-line
  handler: function (_req, res) {
    res
      .status(429)
      .send("Too many requests, please try again after a few seconds.");
    return;
  },
});

// After max requests per windowMs, start delaying response.
export const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 150, // after 150 requests in the 5-minute window
  delayMs: () => 50, // after max requests, delay by 50ms per request
});
