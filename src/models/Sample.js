const db = require("../config/db");
const {
  addSampleService,
  getAllSamplesService,
  getSampleByIdService,
  updateSampleService,
  deleteSampleService,
} = require("../services/sampleService");

/**
 * Models a Sample.
 */
module.exports = class Sample {
  constructor(sampleField1, sampleField2, sampleField3) {
    this.sampleField1 = sampleField1;
    this.sampleField2 = sampleField2;
    this.sampleField3 = sampleField3;
  }

  /**
   * Get all samples.
   */
  static async getAllSamples() {
    return await getAllSamplesService();
  }

  /**
   * Add a new sample.
   */
  async addSample() {
    return await addSampleService(this);
  }

  /**
   * Get the sample by it's ID.
   */
  static async getSampleById(sampleId) {
    return await getSampleByIdService(sampleId);
  }

  /**
   * Update the sample associated with given ID.
   */
  async updateSample(sampleId) {
    return await updateSampleService(sampleId, this);
  }

  /**
   * Delete the sample associated with given ID.
   */
  static async deleteSample(sampleId) {
    return await deleteSampleService(sampleId);
  }
};
