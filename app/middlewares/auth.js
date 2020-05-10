/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/**
 * @Author: Abass Makinde
 * @Date: 06|05|2020
 * @Objective: building to scale
 */

const jwt = require('jsonwebtoken');
const Response = require('../commons/response');
const httpStatus = require('../commons/httpCode');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.authorization;
    if (token === undefined || token.length < 0) {
      return Response.failure(res, { message: 'Access denied! Token is not found in the coockie' }, httpStatus.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return Response.failure(res, { message: 'Invalid token passed' }, httpStatus.UNAUTHORIZED);
  }
};
