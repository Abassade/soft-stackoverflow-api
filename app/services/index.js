
class MongoDBHelper {
  /**
   * The constructor
   * @param mongodbModel - the model you wish to operate on
   */
  constructor(mongodbModel) {
    this.mongodbModel = mongodbModel;
  }

  /**
   * Fetches a single record from the connected MongoDB instance.
   *
   * @param params
   * @returns {Promise}
   */
  get(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongodbModel.findOne(params);

      if (params.fields) { query.select(params.fields); }

      if (params.populate && params.populate.length > 0) {
        params.populate.forEach((collection) => {
          query.populate({ path: collection.path, model: collection.model });
        });
      }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(MongoDBHelper.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }

  /**
   * Fetches a single record from the connected MongoDB instance.
   *
   * @param params
   * @returns {Promise}
   */
  getSorted(param) {
    return new Promise((resolve, reject) => {
      const query = this.mongodbModel.find({ $query: param, $orderby: { createdAt: -1 } });

      return query.exec((err, modelData) => {
        if (err) {
          return reject(MongoDBHelper.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }

  /**
   * Fetches bulk records from the connected MongoDB instance.
   *
   * @param params
   * @returns {Promise}
   */
  getBulk(params) {
    return new Promise((resolve, reject) => {
      const parameter = params;

      const query = params === undefined ? this.mongodbModel.find()
        : this.mongodbModel.find(parameter.conditions);

      if (params && parameter.fields) {
        query.select(params.fields);
      }
      if (params && parameter.distinct) {
        query.distinct(parameter.distinct);
      } else if (params) {
        query.limit(parameter.limit);
      }

      if (params && parameter.sort) {
        query.sort(parameter.sort);
      }

      if (params && parameter.populate && parameter.user) {
        query.populate(parameter.populate.path, parameter.populate.field);
        query.populate(parameter.user.path, parameter.user.field);
      }

      return query.exec((error, modelData) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(modelData);
      });
    });
  }

  /**
   * Saves data into the MongoDB instance
   *
   * @param data
   * @returns {Promise}
   */
  save(data) {
    return new Promise((resolve, reject) => {
      const mongodbSaveSchema = this.mongodbModel(data);
      return mongodbSaveSchema.save((error, result) => {
        if (error != null) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(result);
      });
    });
  }

  /**
   * Updates a SINGLE RECORD in the MongoDB instance's DB based on some conditional criteria
   *
   * @param params - the parameters
   * @returns {Promise}
   */
  search(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongodbModel.find(params.q);
      const parameter = params;

      if (params && parameter.fields) {
        query.select(params.fields);
      }

      if (params && parameter.populate) {
        query.populate(parameter.populate.path, parameter.populate.field);
      }

      if (params && parameter.user) {
        query.populate(parameter.user.path, parameter.user.field);
      }

      if (params.fields) { query.select(params.fields); }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(MongoDBHelper.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }

  update(params, data) {
    return new Promise((resolve, reject) => this.mongodbModel.findOneAndUpdate(
      params,
      { $set: data },
      { new: true },
      (error, response) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        if (error == null && response == null) {
          return reject(new Error("Record Not Found In DB'"));
        }
        return resolve(response);
      },
    ));
  }

  /**
   * Delete MULTIPLE RECORDS from the MongoDB instance's DB based on some conditional criteria
   *
   * @param params - the conditional parameters
   * @returns {Promise}
   */
  deleteBulk(params) {
    return new Promise((resolve, reject) => this.mongodbModel.remove(params.conditions,
      (error, response) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(response);
      }));
  }

  deleteOne(params) {
    return new Promise((resolve, reject) => this.mongodbModel.deleteOne(params,
      (error, response) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(response);
      }));
  }

  /**
   * Used to format the error messages returned from the MongoDB server during CRUD operations
   *
   * @param report
   * @returns {{error: boolean, message: *}}
   */
  static handleError(report) {
    return { error: true, msg: report };
  }
}

module.exports = MongoDBHelper;
