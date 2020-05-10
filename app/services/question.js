/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const MongoDBHelper = require('.');
const logger = require('../lib/logger');
const QuestionModel = require('../models/question');

class Question {
  constructor() {
    this.mongoClient = new MongoDBHelper(QuestionModel);
  }

  getAllQuestions(param) {
    return this.mongoClient.getBulk(param);
  }

  addQuestion(data) {
    logger.info('IN-COMING DATA', data);
    return this.mongoClient.save(data);
  }

  searchKeyWords(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.search(param);
  }

  async checkQuestionAuthor(param, userId) {
    logger.info('IN-COMING PARAM', param);
    const Question = await this.mongoClient.get(param);
    if (Question) {
      const { user } = Question;
      return user.toString() === userId.toString();
    }
  }

  async checkQuestion(param) {
    logger.info('IN-COMING PARAM', param);
    const user = await this.mongoClient.get(param);
    return !!(user !== undefined && user != null);
  }

  getQuestion(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.get(param);
  }

  updateQuestion(param, data) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.update(param, data);
  }

  deleteQuestion(param) {
    logger.info('IN-COMING PARAM', param);
    return this.mongoClient.deleteOne(param);
  }
}

module.exports = Question;
