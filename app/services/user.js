const MongoDBHelper = require('.');
const logger = require('../lib/logger');
const UserModel = require('../models/user');

class User {
  constructor() {
    this.mongoClient = new MongoDBHelper(UserModel);
  }

  getAllUsers() {
    return this.mongoClient.getBulk();
  }

  searchKeyWords(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.search(param);
  }

  addUser(data) {
    logger.info('IN-COMING DATA', data);
    return this.mongoClient.save(data);
  }

  async checkUser(param) {
    logger.info('IN-COMING PARAM', param);
    const user = await this.mongoClient.get(param);
    return !!(user !== undefined && user != null);
  }

  getUser(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.get(param);
  }

  updateUser(param, data) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.update(param, data);
  }

  deleteUser(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.deleteOne(param);
  }
}

module.exports = User;
