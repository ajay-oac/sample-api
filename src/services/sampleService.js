const getDbConfig = require("../config/dbConfig");
const {
  DATABASE_CONNECTION_FAILURE_ERROR_MESSAGE,
} = require("../config/configConstants");
const { DEV_ENV } = require("../constants/constants");
const DatabaseError = require("../errors/DatabaseError");
const {
  DEV_INSERTION_QUERY,
  DEV_SELECT_BY_ID_QUERY,
  DEV_UPDATION_QUERY,
  DEV_DELETION_QUERY,
  PROD_INSERTION_QUERY,
  PROD_SELECT_BY_ID_QUERY,
  PROD_UPDATION_QUERY,
  PROD_DELETION_QUERY,
  SELECT_ALL_QUERY,
} = require("./sampleServiceQueryConstants");
const { FAILED_TO_EXECUTE_QUERY_ERROR_MESSAGE } = require("./serviceConstants");

const env = process.env.NODE_ENV;

let INSERT_QUERY = PROD_INSERTION_QUERY;
let SELECT_QUERY = SELECT_ALL_QUERY;
let SELECT_BY_ID_QUERY = PROD_SELECT_BY_ID_QUERY;
let UPADATE_QUERY = PROD_UPDATION_QUERY;
let DELETE_QUERY = PROD_DELETION_QUERY;
if (env === DEV_ENV) {
  INSERT_QUERY = DEV_INSERTION_QUERY;
  SELECT_BY_ID_QUERY = DEV_SELECT_BY_ID_QUERY;
  UPADATE_QUERY = DEV_UPDATION_QUERY;
  DELETE_QUERY = DEV_DELETION_QUERY;
}

const executeQuery = async (query, params = null) => {
  try {
    const db = await getDbConfig();
    const result = await db.query(query, params);
    db.end();
    return result;
  } catch (error) {
    throw error.message === DATABASE_CONNECTION_FAILURE_ERROR_MESSAGE
      ? error
      : new DatabaseError(FAILED_TO_EXECUTE_QUERY_ERROR_MESSAGE);
  }
};

exports.addSampleService = async ({
  sampleField1,
  sampleField2,
  sampleField3,
}) => {
  return await executeQuery(INSERT_QUERY, [
    sampleField1,
    sampleField2,
    sampleField3,
  ]);
};

exports.getAllSamplesService = async () => {
  const result = await executeQuery(SELECT_QUERY);
  return env === DEV_ENV ? result[0] : result.rows;
};

exports.getSampleByIdService = async (sampleId) => {
  const result = await executeQuery(SELECT_BY_ID_QUERY, [sampleId]);
  return env === DEV_ENV ? result[0][0] : result.rows[0];
};

exports.updateSampleService = async (
  sampleId,
  { sampleField1, sampleField2, sampleField3 }
) => {
  if (await this.getSampleByIdService(sampleId)) {
    await executeQuery(UPADATE_QUERY, [
      sampleField1,
      sampleField2,
      sampleField3,
      sampleId,
    ]);
    return true;
  }
  return false;
};

exports.deleteSampleService = async (sampleId) => {
  const sample = await this.getSampleByIdService(sampleId);
  if (sample) {
    await executeQuery(DELETE_QUERY, [sampleId]);
    return sample;
  }
  return null;
};
