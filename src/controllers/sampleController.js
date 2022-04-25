const DatabaseError = require("../errors/DatabaseError");
const DataNotValidError = require("../errors/DataNotValidError");
const ResourceNotFoundError = require("../errors/ResourceNotFoundError");
const ServiceNotAvailableErrorMessage = require("../errors/ServiceNotAvailableError");
const Sample = require("../models/Sample");
const {
  SAMPLE_DOES_NOT_EXIST_ERROR_MESSAGE,
  SAMPLE_DELETE_FAILURE_ERROR_MESSAGE,
  SAMPLE_DATA_INVALID_ERROR_MESSAGE,
  SAMPLE_DATA_DB_ERROR_MESSAGE,
} = require("./controllerConstants");

/**
 * Prepare response data before sending and call the final middleware.
 */
const sendResponse = (data, res, next) => {
  res.preparedBody = data;
  next();
};

const callServiceAndHandleDbError = async (callback, next) => {
  try {
    await callback();
  } catch (error) {
    error instanceof DatabaseError
      ? next(error)
      : next(new ServiceNotAvailableErrorMessage(SAMPLE_DATA_DB_ERROR_MESSAGE));
  }
};

/**
 * Handles GET: /sample - gets all samples.
 */
exports.get = (req, res, next) => {
  callServiceAndHandleDbError(async () => {
    const samples = await Sample.getAllSamples();
    sendResponse({ samples, totalRecords: samples.length }, res, next);
  }, next);
};

/**
 * Handles GET: /sample/:sampleId - gets the sample by it's ID.
 */
exports.getById = (req, res, next) => {
  callServiceAndHandleDbError(async () => {
    const sample = await Sample.getSampleById(req.params.sampleId);
    if (sample) sendResponse(sample, res, next);
    else next(new ResourceNotFoundError(SAMPLE_DOES_NOT_EXIST_ERROR_MESSAGE));
  }, next);
};

/**
 * Handles PUT: /sample/:sampleId - updates the sample related to
 * received sample ID.
 */
exports.put = (req, res, next) => {
  callServiceAndHandleDbError(async () => {
    const { sampleField1, sampleField2, sampleField3 } = req.body;
    const date = new Date(sampleField3);
    const dateString = date.toDateString();
    if (!sampleField1 || !sampleField2 || dateString === "Invalid Date")
      return next(new DataNotValidError(SAMPLE_DATA_INVALID_ERROR_MESSAGE));
    const sample = new Sample(
      sampleField1,
      sampleField2,
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    const hasSampleBeenUpdatedSuccessfully = await sample.updateSample(
      req.params.sampleId
    );
    if (hasSampleBeenUpdatedSuccessfully) sendResponse(sample, res, next);
    else next(new ResourceNotFoundError(SAMPLE_DOES_NOT_EXIST_ERROR_MESSAGE));
  }, next);
};

/**
 * Handles POST: /sample - adds a new sample.
 */
exports.post = (req, res, next) => {
  callServiceAndHandleDbError(async () => {
    const { sampleField1, sampleField2, sampleField3 } = req.body;
    const date = new Date(sampleField3);
    const dateString = date.toDateString();
    if (!sampleField1 || !sampleField2 || dateString === "Invalid Date")
      return next(new DataNotValidError(SAMPLE_DATA_INVALID_ERROR_MESSAGE));
    const sample = new Sample(
      sampleField1,
      sampleField2,
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    await sample.addSample();
    sendResponse(sample, res, next);
  }, next);
};

/**
 * Handles DELETE: /sample/:sampleId - deletes the sample related
 * to received ID.
 */
exports.delete = (req, res, next) => {
  callServiceAndHandleDbError(async () => {
    const deletedSample = await Sample.deleteSample(req.params.sampleId);
    if (deletedSample) sendResponse(deletedSample, res, next);
    else next(new ResourceNotFoundError(SAMPLE_DELETE_FAILURE_ERROR_MESSAGE));
  }, next);
};
