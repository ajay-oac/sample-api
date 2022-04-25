const {
  get: getController,
  getById: getByIdController,
  post: postController,
  put: putController,
  delete: deleteContoller,
} = require("../controllers/sampleController");
const router = require("express").Router();

/**
 * Middleware for appending status 200
 * and default headers before sending request
 */
const responseExitHandler = (req, res) => {
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json(res.preparedBody);
};

const getRouteHandlers = (handler) => [handler, responseExitHandler];

/**
 * Handling routes for /sample
 */
router
  .route("/")
  .get(getRouteHandlers(getController))
  .post(getRouteHandlers(postController));

/**
 * Handling routes for /sample/:sampleId
 */
router
  .route("/:sampleId")
  .get(getRouteHandlers(getByIdController))
  .put(getRouteHandlers(putController))
  .delete(getRouteHandlers(deleteContoller));

module.exports = router;
