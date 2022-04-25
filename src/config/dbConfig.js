const { DEV_ENV } = require("../constants/constants");
const DatabaseError = require("../errors/DatabaseError");
const dbConfigFromEnv = require("../helpers/getDbConfigFromEnv");
const {
  DATABASE_CONNECTION_FAILURE_ERROR_MESSAGE,
} = require("./configConstants");

module.exports = async () => {
  try {
    if (process.env.NODE_ENV === DEV_ENV) {
      const { createConnection } = require("mysql2/promise");
      return await createConnection(dbConfigFromEnv);
    }
    const { Client } = require("pg");
    const prodDbClient = new Client(dbConfigFromEnv);
    await prodDbClient.connect();
    return prodDbClient;
  } catch (error) {
    throw new DatabaseError(DATABASE_CONNECTION_FAILURE_ERROR_MESSAGE);
  }
};
