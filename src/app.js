const { INVALID_URL_ERROR_MESSAGE } = require("./constants/constants");
const ResourceNotFoundError = require("./errors/ResourceNotFoundError");
require("dotenv").config();
const express = require("express");
const ApiError = require("./errors/ApiError");
const sampleRoutes = require("./routes/sampleRoutes");

/**
 * Initializing Express
 */
const app = express();
app.use(express.json());

/**
 * Middleware for adding CORS related headers in all requests.
 */
app.use((req, res, next) => {
  res
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "*")
    .setHeader("Access-Control-Allow-Headers", "*");
  next();
});

/**
 * Handling routes for /sample
 */
app.use("/sample", sampleRoutes);

/**
 * Default Route Handler.
 */
const defaultRouteHandler = (req, res, next) =>
  next(new ResourceNotFoundError(INVALID_URL_ERROR_MESSAGE));
app.use("/", defaultRouteHandler);

/**
 * Global Error Handler
 */
const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError)
    res.status(err.responseStatusCode).json(err.getError());
  else
    res
      .status(500)
      .json(err || { error: { message: "Something went wrong!", code: 500 } });
};
app.use(globalErrorHandler);

/**
 * Defining Port and starting to listen to requests
 */
const port = process.env.PORT || 3032;
app.listen(port);
