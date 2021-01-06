/* eslint-disable consistent-return */
const Response = require('../commons/response');
const httpCode = require('../commons/httpCode');
const logger = require('../lib/logger');
const AnswerService = require('../services/answer');
const QuestionService = require('../services/question');

class Answer extends AnswerService {
  async answerQuestion(req, res) {
    const { answer, question } = req.body;
    const { userId } = req;

    if (!answer || !question) {
      return Response.failure(res, { message: 'request body is required' }, httpCode.BAD_REQUEST);
    }
    if (!userId) {
      return Response.failure(res, { message: 'user unathourized' }, httpCode.UNAUTHORIZED);
    }
    req.body.user = userId;
    try {
      const questionInstance = new QuestionService();
      const questionId = question;
      const quest = await questionInstance.checkQuestion({ _id: questionId });
      if (!quest) {
        return Response.failure(res, { message: 'question not found' }, httpCode.NOT_FOUND);
      }
      const record = await this.addAnswer(req.body);
      if (record) {
        logger.info('!!!!!!added Answer!!!!!!!!!!');
        return Response.success(res, { message: 'Answer added successfully', response: record.Answer }, httpCode.CREATED);
      }
    } catch (err) {
      logger.info(err);
      return Response.failure(res, { message: 'unable to add Answer' }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async getAnswers(req, res) {
    try {
      const params = {
        fields: { createdAt: 0, updatedAt: 0, __v: 0 },
        populate: { path: 'question', field: 'question votes' },
        user: { path: 'user', field: 'firstname lastname email' },
      };
      const result = await this.getAllAnswers(params);
      if (result && result.length > 0) {
        return Response.success(res, {
          message: 'Answers fetched successfully',
          response: result,
        }, httpCode.OK);
      }
      return Response.success(res, {
        message: 'no Answers available',
        response: [],
      }, httpCode.OK);
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to query Answer collection', data: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async searchEngine(req, res) {
    const { keywords } = req.query;
    try {
      if (!keywords) {
        return Response.failure(res, { message: 'keywords required as query param' }, httpCode.BAD_REQUEST);
      }
      const param = {
        q: { $text: { $search: keywords } },
        fields: { __v: 0 },
        populate: { path: 'question', field: 'question' },
        user: { path: 'user', field: 'firstname lastname email' },
      };

      const result = await this.searchKeyWords(param);
      if (result.length > 0) {
        return Response.success(res, {
          message: 'fetched successfully',
          response: result,
        }, httpCode.OK);
      }
      return Response.success(res, {
        message: 'no result for the keywords',
        response: [],
      }, httpCode.NOT_FOUND);
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to search collection', response: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new Answer();
