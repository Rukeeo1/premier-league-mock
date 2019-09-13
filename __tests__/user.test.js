const request = require('supertest');
const mongoose = require('mongoose');
const {app} = require('../server');
const User = require('../models/user.model');


let userFour;

beforeEach(async () => {
  await User.deleteMany().exec();
  let userOne = {
    name: 'Rukee Ojigbo',
    email: 'rukeeojigbo@gmail.com',
    password: '123456',
    favoriteTeam: 'Manchester United'
  };

  let userTwo = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
    favoriteTeam: 'Chealsea Fc'
  };

  let userThree = {
    name: 'Nkem Alozie',
    email: 'nkem@gmail.com',
    password: '123456',
    favoriteTeam: 'Arsenal FC'
  };

  userFour = {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: '123456',
    favoriteTeam: 'Rashford FC'
  };
  afterAll(async () => {
    mongoose.connection.close();
    app.close();
  });

  userOne = await new User(userOne).save();
  userTwo = await new User(userTwo).save();
  userThree = await new User(userThree).save();
});

afterAll(async () => {
  await User.deleteMany();
  // mongoose.connection.close(); 
});

describe('#USER: test for user route', () => {
  describe('Health check', () => {
    it('should return OK for health-check', async () => {
      await request(app)
        .get('/api/v1/health-check/')
        .then(res => {
          console.log(res.body);
          expect(res.text).toMatch(/OK/);
          expect(res.status).toBe(200);
        });
    });
  });
  describe('#SIGN-UP', () => {
    it('should allow the user signup', async () => {
      const response = await request(app)
        .post('/api/v1/user')
        .send(userFour)
        .expect(200);
      expect(response.body.payload).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        isAdmin: expect.any(Boolean)
      });
    });

    it('#EMAILS: Should not allow duplicate emails',
      async () => {
        const response = await request(app)
          .post('/api/v1/user')
          .send({
            name: 'Rukee Ojigbo',
            email: 'rukeeojigbo@gmail.com',
            password: '123456',
            favoriteTeam: 'Manchester United'
          })
          .expect(200);
        const { statusCode, message, errors } = response.body;
        expect(statusCode).toBe(400);
        expect(message).toMatch("Bad Request");
        expect(errors).toBeDefined;
      });

      describe('#LOGIN', () => {
        it('a registered user should be able to login', async () => {
          const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
              email: 'rukeeojigbo@gmail.com',
              password: '123456',
            })
            .expect(200);
    
          const { statusCode, message, payload } = response.body;
          expect(statusCode).toBe("OK");
          expect(message).toMatchObject({
    
            name: expect.any(String),
            email: expect.any(String),
            favoriteTeam: expect.any(String)
          });
          expect(payload).toBeDefined;
        })
    
        it('should not allow non-registered users or users with wrong password', async () => {
          const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
              email: 'rukeeojigbo@gmail.com',
              password: '2222xxx',
            })
            .expect(200);
    
          const { statusCode, message, payload, errors } = response.body;
          expect(statusCode).toBe(400);
          expect(message).toBe('Email or Password is Wrong')
    
        })
      })
  });
});
