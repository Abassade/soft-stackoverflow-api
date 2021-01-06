const MongoDBHelper = require('.');
const logger = require('../lib/logger');
const AnswerModel = require('../models/answer');

class Answer {
  constructor() {
    this.mongoClient = new MongoDBHelper(AnswerModel);
  }

  getAllAnswers(param) {
    logger.info('IN-COMING DATA', param);
    return this.mongoClient.getBulk(param);
  }

  addAnswer(data) {
    logger.info('IN-COMING DATA', data);
    return this.mongoClient.save(data);
  }

  getAnswer(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.get(param);
  }

  searchKeyWords(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.search(param);
  }

  updateAnswer(param, data) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.update(param, data);
  }

  deleteAnswer(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.deleteOne(param);
  }
}

module.exports = Answer;
