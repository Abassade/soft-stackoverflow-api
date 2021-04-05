/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Util = require('../lib/utils');
const Response = require('../commons/response');
const httpCode = require('../commons/httpCode');
const UserSchema = require('../schema/user');
const UserService = require('../services/user');
const logger = require('../lib/logger');

class User extends UserService {
  async userSignUp(req, res) {
    const user = req.body;
    // validate schema
    await UserSchema.signUpUser.validateAsync(user);

    const { email, password, cPassword } = user;

    if (password !== cPassword) {
      return Response.failure(res, { message: 'the two passwords do not match' }, httpCode.BAD_REQUEST);
    }
    try {
      const record = await this.checkUser({ email });
      if (record) {
        return Response.failure(res, { message: 'user already exists' }, httpCode.BAD_REQUEST);
      }
      try {
        const hashedPassword = await Util.hashPassword(req.body.password);
        req.body.password = hashedPassword;
        req.body.cPassword = hashedPassword;
        try {
          const client = await this.addUser(req.body);
          if (client) {
            return Response.success(res, { message: 'successfully registered a new user', response: client.email }, httpCode.CREATED);
          }
        } catch (err) {
          return Response.failure(res, { message: 'unable to save user', response: err }, httpCode.INTERNAL_SERVER_ERROR);
        }
      } catch (error) {
        logger.info(error);
        return Response.failure(res, { message: 'unable to hash password', data: error }, httpCode.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      return Response.failure(res, { message: 'unable to check db by email', response: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async userSignIn(req, res) {
    const data = req.body;
    const { email, password } = data;

    // validate schema
    await UserSchema.signInUser.validateAsync(data);

    try {
      const record = await this.getUser({ email });
      if (!record) {
        return Response.failure(res, { message: 'email entered not exists' }, httpCode.UNAUTHORIZED);
      }
      bcrypt.compare(password, record.password, (err, result) => {
        if (err) {
          logger.info(err);
          return Response.failure(res, { message: 'unable to campare password', response: err }, httpCode.UNAUTHORIZED);
        }
        if (result) {
          const token = jwt.sign({ email: record.email, id: record._id },
            process.env.JWT_SECRET, { expiresIn: '12h' });
          res.cookie('authorization', token);
          return Response.success(res, { message: 'user successfully logged in', response: { token, id: record._id } }, httpCode.OK);
        }
        return Response.failure(res, { message: 'incorrect password' }, httpCode.UNAUTHORIZED);
      });
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to check client by email from db', response: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserRecord(req, res) {
    try {
      const { userId } = req.params;
      const result = await this.getUser({ _id: userId });
      if (!result) {
        return Response.failure(res, {
          message: 'user not found',
          response: result,
        }, httpCode.BAD_REQUEST);
      }
      const resp = {
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        userId: result._id,
      };
      Response.success(res, {
        message: 'user fetched successfully',
        response: resp,
      }, httpCode.OK);
    } catch (error) {
      logger.info(error);
      return Response.failure(res, { message: 'unable to query User collection', data: error }, httpCode.INTERNAL_SERVER_ERROR);
    }
  }

  async searchEngine(req, res) {
    const { keywords } = req.query;
    try {
      const param = {
        q: { $text: { $search: keywords } },
        fields: { password: 0, cPassword: 0, __v: 0 },
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

module.exports = new User();
