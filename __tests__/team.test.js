const request = require('supertest');
const mongoose = require('mongoose');
const {app }= require('../server');
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
  // mongoose.connection.close();
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

    it('shouldnot allow an empty requesst body', async () => {
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
        .send({ })
        .expect(200);

      const { statusCode, message, payload } = editedTeam.body;

      expect(statusCode).toBe(400),
        expect(message).toBe('Request body cant be empty')
      
    });
  });

  describe('#View Teams', () => {
    it('A login user should be able to view all teams', async () => {
      const loginUser = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'rukeeogjigbo@gmail.com',
          password: '123456'
        });

      const { payload: token } = loginUser.body;
      const getTEams = await request(app)
        .get('/api/v1/teams')
        .set('Authorization', `Bearer ${token}`)
        const { statusCode, message, payload } = getTEams.body;
        expect(statusCode).toBe(200);
        expect(message).toBe('These are a list of all the teams');
        expect(payload).toBeDefined();
    });

    it("shouldn't allow a user who isn't logged in view all teams", async () => {
      const getTEams = await request(app).get('/api/v1/teams');
      const { statusCode, message } = getTEams.body;
      expect(statusCode).toBe(401);
      expect(message).toMatch(/You are not authorized/i);
    });
  });

  describe('#Delete Team', () => {
    it('The Admin should be able to delete a team', async () => {
      const adminLogin = await request(app)
        .post('/api/v1/auth/admin-login')
        .send({
          email: 'admin@gmail.com',
          password: '123456'
        });

      //get token
      const { payload: token } = adminLogin.body;
      const response = await request(app)
        .delete(`/api/v1/admin/remove-team/${teamToEditId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { statusCode, message, payload, error } = response.body;
      expect(statusCode).toBe(200);
      expect(message).toMatch('Team sucessfully removed');
      expect(payload).toBeDefined();
      // expect(payload).toBeFalsy();
    })
  });
      describe('#Search Team', () => {
        it('A user should be able to search for a team', async () => {
          const response = await request(app)
            .get(`/api/v1/teams/search?search=ar`)
            .expect(200);
          const { statusCode, message, payload, error } = response.body;
          expect(statusCode).toBe(200);
          expect(message).toMatch('Team search sucessful');
          expect(payload).toBeDefined();
        });
      });
});
