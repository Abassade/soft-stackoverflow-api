/* eslint-disable consistent-return */
const Response = require('../commons/response');
const httpCode = require('../commons/httpCode');
const logger = require('../lib/logger');
const QuestionService = require('../services/question');

class Question extends QuestionService {
  async createQuestion(req, res) {
    const { question } = req.body;
    const { userId } = req;

    if (!question) {
      return Response.failure(res, { message: 'question is required' }, httpCode.BAD_REQUEST);
    }

    if (req.body.votes) {
      return Response.failure(res, { message: 'you cannot vote yourself' }, httpCode.BAD_REQUEST);
    }

    if (!userId) {
      return Response.failure(res, { message: 'user unathourized' }, httpCode.UNAUTHORIZED);
    }
    req.body.user = userId;
    try {
      const record = await this.addQuestion(req.body);
      if (record) {
        logger.info('!!!!!! added new question !!!!!!!!!!');
        return Response.success(res, { message: 'question added successfully', response: record.question }, httpCode.CREATED);
      }
    } catch (err) {
      logger.info(err);
      return Response.failure(res, { message: 'unable to create new question' }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async getQuestions(req, res) {
    try {
      const params = {
        fields: {
          cPassword: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0,
        },
        populate: { path: 'user', field: 'firstname lastname email' },
      };
      const result = await this.getAllQuestions(params);
      if (result.length > 0) {
        return Response.success(res, {
          message: 'questions fetched successfully',
          response: result,
        }, httpCode.OK);
      }
      return Response.success(res, {
        message: 'no questions available',
        response: [],
      }, httpCode.OK);
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to query question collection', data: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async voteQuestion(req, res) {
    const { vote, questionId } = req.query;
    const { userId } = req;

    if (!vote || !questionId) {
      return Response.failure(res, { message: 'query params required' }, httpCode.BAD_REQUEST);
    }

    if (vote !== 'up' && vote !== 'down') {
      return Response.failure(res, { message: 'vote can either be up or down' }, httpCode.BAD_REQUEST);
    }
    const UNIT = vote === 'up' ? 1 : -1;

    try {
      const record = await this.getQuestion({ _id: questionId });
      if (!record) {
        return Response.failure(res, { message: 'question not found' }, httpCode.NOT_FOUND);
      }

      const user = await this.checkQuestionAuthor({ _id: questionId }, userId);
      logger.info('User is the author', user);
      if (user) {
        return Response.failure(res, { message: 'you cannot vote yourself' }, httpCode.BAD_REQUEST);
      }

      let { votes } = record;
      votes += UNIT;

      const question = await this.updateQuestion({ _id: questionId }, { votes });
      if (question) {
        return Response.success(res, { message: `your (${vote}) vote has been added` }, httpCode.OK);
      }
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to update record', response: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async searchEngine(req, res) {
    const { keywords } = req.query;
    try {
      const param = {
        q: { $text: { $search: keywords } },
        fields: { __v: 0 },
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
      }, httpCode.OK);
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to search collection', response: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new Question();
