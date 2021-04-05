const express = require('express');

const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const UserController = require('../../controllers/user');


route.post('/signin', asyncHandler((req, res) => UserController.userSignIn(req, res)));

route.post('/signup', asyncHandler((req, res) => UserController.userSignUp(req, res)));

route.get('/:userId', asyncHandler((req, res) => UserController.getUserRecord(req, res)));

route.get('/text/search', asyncHandler((req, res) => UserController.searchEngine(req, res)));


module.exports = route;
