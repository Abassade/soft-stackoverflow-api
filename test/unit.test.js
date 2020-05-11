/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app/app');
const Question = require('../app/models/question');
const User = require('../app/models/user');

const request = supertest(app);

describe('The base api is working', () => {
  it('should respond with a welcome message', async (done) => {
    const res = await request
      .get('/');
    expect(res.status).toBe(200);
    done();
  });
});

describe('User signing up', () => {
  it('should sign up a new user', async (done) => {
    await User.deleteMany();
    const user = {
      email: 'razaq@gmail.com',
      password: 'goldman',
      cPassword: 'goldman',
      firstname: 'razaq',
      lastname: 'naz',
    };
    const res = await request.post('/v1/user/signup').send(user);
    expect(res.status).toBe(201);
    expect(res.body.error).toBe(false);
    done();
  });

  it('should return with an error message, passwords do not match', async (done) => {
    const user = {
      email: 'blue@gmail.com',
      password: 'goldman',
      cPassword: 'ggoldman',
      firstname: 'razaq',
      lastname: 'naz',
    };
    const res = await request.post('/v1/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
    expect(res.body.message).toBe('the two passwords do not match');
    done();
  });
});

describe('User sign in', () => {
  it('should sign in user with a success', async (done) => {
    const user = {
      email: 'razaq@gmail.com',
      password: 'goldman',
    };
    const res = await request.post('/v1/user/signin').send(user);
    expect(res.status).toBe(200);
    expect(res.body.error).toBe(false);
    done();
  });

  it('should return with 401 error saying user does not exists', async (done) => {
    const user = {
      email: 'best@gmail.com',
      password: 'goldman',
    };
    const res = await request.post('/v1/user/signin').send(user);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe(true);
    done();
  });
});

describe('Questions category', () => {
  it('should respond with not authorized to add a new question to the db', async (done) => {
    await Question.deleteMany();
    const question = {
      question: 'How can we make a million in a day?',
    };
    const res = await request.post('/v1/question').send(question);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe(true);
    done();
  });

  it('Should return with a list of questions', async (done) => {
    const res = await request.get('/v1/question/');
    const type = typeof (res.body.data);
    expect(res.status).toBe(200);
    expect(res.body.error).toBe(false);
    expect(type).toBe('object');
    done();
  });

  it('Should return with a 400 error code for not passing keywords', async (done) => {
    const res = await request.get('/v1/question/search?keywords=');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
    done();
  });
});


describe('Answer endpoints', () => {
  it('Should return with a list of answers', async (done) => {
    const res = await request.get('/v1/answer');
    expect(res.status).toBe(200);
    expect(res.body.error).toBe(false);
    done();
  });

  it('Should return with a 400 error for bad request', async (done) => {
    const res = await request.get('/v1/answer');
    expect(res.status).toBe(200);
    expect(res.body.error).toBe(false);
    done();
  });

  it('Should return with a list of answers related to the keywords', async (done) => {
    const res = await request.get('/v1/answer/search?keywords=yes');
    const type = typeof (res.body.data);
    expect(res.status).toBe(200);
    expect(res.body.error).toBe(false);
    expect(type).toBe('object');
    done();
  });

  it('Should return with a 400 error code for not passing keywords', async (done) => {
    const res = await request.get('/v1/answer/search?keywords=');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
    done();
  });
});
