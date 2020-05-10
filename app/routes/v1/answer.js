const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const AnswerController = require('../../controllers/answer');
const auth = require('../../middlewares/auth');

route.get('/', asyncHandler((req, res) => AnswerController.getAnswers(req, res)));

route.post('/', auth, asyncHandler((req, res) => AnswerController.answerQuestion(req, res)));

route.get('/search', asyncHandler((req, res) => AnswerController.searchEngine(req, res)));


module.exports = route;
