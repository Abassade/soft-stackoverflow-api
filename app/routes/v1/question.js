/* eslint-disable max-len */
const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const auth = require('../../middlewares/auth');
const QuestionController = require('../../controllers/question');


route.get('/', asyncHandler((req, res) => QuestionController.getQuestions(req, res)));

route.post('/', auth, asyncHandler((req, res) => QuestionController.createQuestion(req, res)));

route.get('/vote', auth, asyncHandler((req, res) => QuestionController.voteQuestion(req, res)));

route.get('/search', asyncHandler((req, res) => QuestionController.searchEngine(req, res)));

module.exports = route;
