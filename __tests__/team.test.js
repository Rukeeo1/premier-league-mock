const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user.model');
const TeamModel = require('../models/team.model');

//dummy users...
let user = {
  name: 'Rukee Ojigbo',
  email: 'rukeeogjigbo@gmail.com',
  password: '123456',
  favoriteTeam: 'Manchester United'
};

let admin = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: '123456',
  favoriteTeam: 'Arsenal'
};

let teamOne = {
  name: 'Manchester United',
  address: 'Old Trafford',
  city: 'Manchester',
  founded: '1880',
  code: 'MUN'
};

let teamTwo = {
  name: 'Arsenalx Fooxxtball Club',
  address: 'Gunners Stadium',
  city: 'London',
  founded: '1987',
  code: 'AFC'
};

let teamToEditId;
beforeEach(async () => {
  await TeamModel.deleteMany().exec();

  const userSignUp = await request(app)
    .post('/api/v1/user')
    .send(user);
  user = userSignUp.body;

  //create admin and login
  const adminSignUp = await request(app)
    .post('/api/v1/admin')
    .send(admin);
  admin = adminSignUp.body;

  const adminLogin = await request(app)
    .post('/api/v1/auth/admin-login')
    .send({
      email: 'admin@gmail.com',
      password: '123456'
    });

  //extract token...
  const { payload: token } = adminLogin.body;

  //create add team
  const addTeam = await request(app)
    .post('/api/v1/admin/add-team')
    .set('Authorization', `Bearer ${token}`)
    .send(teamTwo);

  teamToEditId = addTeam.body.payload._id;
});

afterAll(async () => {
  await User.deleteMany().exec();
  await TeamModel.deleteMany().exec();
  mongoose.connection.close();
});

describe('#TEAM', () => {
  describe('#Add Teams', () => {
    it('Admin should be able to add a team', async () => {
      //login admin and get token:
      const adminLogin = await request(app)
        .post('/api/v1/auth/admin-login')
        .send({
          email: 'admin@gmail.com',
          password: '123456'
        });

      //get token
      const { payload: token } = adminLogin.body;

      //create team...
      const addTeam = await request(app)
        .post('/api/v1/admin/add-team')
        .set('Authorization', `Bearer ${token}`)
        .send(teamOne)
        .expect(200);

      const { statusCode, message, payload } = addTeam.body;

      expect(statusCode).toBe(200);
      expect(message).toBe('team created');
      expect(payload).toBeDefined();
      expect(payload.name).toMatch(/Manchester United/i);
    });

    it('Should not allow ordinary users create teams', async () => {
      //user login...
      const userLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'rukeeogjigbo@gmail.com',
          password: '123456'
        });

      //get token
      const { payload: token } = userLogin.body;

      //create team...
      const addTeam = await request(app)
        .post('/api/v1/admin/add-team')
        .set('Authorization', `Bearer ${token}`)
        .send(teamOne)
        .expect(200);

      const { statusCode, message, payload } = addTeam.body;
      expect(statusCode).toBe(401);
      expect(message).toBe('Admin Only');
      expect(payload).toBeUndefined();
    });
  });

  describe('#Edit Teams', () => {
    it('An admin should be able to edit a team', async () => {
      //login admin and get token:
      const adminLogin = await request(app)
        .post('/api/v1/auth/admin-login')
        .send({
          email: 'admin@gmail.com',
          password: '123456'
        });

      const { payload: token } = adminLogin.body;

      const editedTeam = await request(app)
        .put(`/api/v1/admin/edit-team/${teamToEditId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'rukee football club' })
        .expect(200);

      const { statusCode, message, payload } = editedTeam.body;

      expect(statusCode).toBe(200),
        expect(message).toBe('Team details update successfully'),
        expect(payload).toMatchObject({
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          founded: expect.any(String),
          code: expect.any(String)
        });
    });
  });
});
