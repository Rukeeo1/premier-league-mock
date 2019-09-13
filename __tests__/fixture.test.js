const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user.model');
const TeamModel = require('../models/team.model');
const Fixture = require('../models/fixture.model');

let user = {
  name: 'Rukee Ojigbo',
  email: 'rukeeojigbo@gmail.com',
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
  name: 'Arsenal Football Club',
  address: 'Gunners Stadium',
  city: 'London',
  founded: '1987',
  code: 'AFC'
};

let teamOneId;
let teamTwoId;
let adminToken;
let userToken;
let fixtureId;

afterAll(async () => {
  await User.deleteMany().exec();
  await TeamModel.deleteMany().exec();
  await Fixture.deleteMany().exec()
});
beforeAll(async () => {
  await TeamModel.deleteMany().exec();
  //register user...
  const userSignUp = await request(app)
    .post('/api/v1/user')
    .send(user);
  user = userSignUp.body;

  let userLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'rukeeojigbo@gmail.com',
      password: '123456'
    });
  userToken = userLogin.body.payload;

  //admin signup...
  const adminSignUp = await request(app)
    .post('/api/v1/admin')
    .send(admin);
  admin = adminSignUp.body;

  //login admin and get token:
  const adminLogin = await request(app)
    .post('/api/v1/auth/admin-login')
    .send({
      email: 'admin@gmail.com',
      password: '123456'
    });
  adminToken = adminLogin.body.payload;

  //create add team
  const addTeam = await request(app)
    .post('/api/v1/admin/add-team')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(teamOne);

  teamOne = addTeam.body;
  teamOneId = addTeam.body.payload._id;

  //create add team
  const addTeamTwo = await request(app)
    .post('/api/v1/admin/add-team')
    .set('Authorization', `Bearer ${adminToken}`)
    .send(teamTwo);
  teamTwo = addTeamTwo.body;
  teamTwoId = addTeamTwo.body.payload._id;

  const addFixture = await request(app)
    .post('/api/v1/admin/fixtures')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      date: '29-11-2012',
      time: ' 11:48PM',
      status: 'Pending',
      venue: 'Old Trafford',
      homeTeam: teamTwoId,
      awayTeam: teamOneId,
      homeTeamName: 'Manchester United',
      awayTeamName: 'Arsenal Football Club'
    });
  fixtureId = addFixture.body.payload._id;
});

describe('#FIXTURES routes', () => {
  describe('#Adding Fixtures', () => {
    it('Should allow an admin create teams', async () => {
      let fixture = {
        time: '12:30PM',
        venue: 'Old Trafford',
        homeTeam: teamOneId,
        awayTeam: teamTwoId,
        awayTeamName: 'Manchester United',
        homeTeamName: 'Arsenal Football Club',
        date: '12:15pm'
      };

      const adminLogin = await request(app)
        .post('/api/v1/auth/admin-login')
        .send({
          email: 'admin@gmail.com',
          password: '123456'
        });

      //extract token...
      const { payload: token } = adminLogin.body;

      const addFixture = await request(app)
        .post('/api/v1/admin/fixtures')
        .set('Authorization', `Bearer ${token}`)
        .send(fixture)
        .expect(200);

      const { message, statusCode, payload } = addFixture.body;
      expect(statusCode).toBe(200);
      expect(message).toBe('fixture successfully created');
      expect(payload).toBeDefined();

      expect(payload).toMatchObject({
        date: expect.any(String),
        time: expect.any(String),
        homeTeam: expect.any(String),
        awayTeam: expect.any(String),
        status: expect.any(String),
        goalsHomeTeam: expect.any(String),
        goalsAwayTeam: expect.any(String)
      });
    });

    it("Regular users can't add fixtures", async () => {
      const userLogin = await request(app)
        .post('/api/v1/admin/fixtures')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          time: '12:30PM',
          venue: 'Old Trafford',
          homeTeam: teamOneId,
          awayTeam: teamTwoId,
          awayTeamName: 'Manchester United',
          homeTeamName: 'Arsenal Football Club',
          date: '12:15pm'
        })
        .expect(200);
      const { statusCode, message } = userLogin.body;
      expect(statusCode).toBe(401);
      expect(message).toMatch(/Admin Only/i);
    });
  });

  describe('#Edit', () => {
    it('An admin should be able to edit fixture details', async () => {
      const editedFixture = await request(app)
        .put(`/api/v1/admin/edit-fixture/${fixtureId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          goalsAwayTeam: '2',
          goalsHomeTeam: '3',
          status: 'Pending'
        })
        .expect(200);

      const { statusCode, message, payload } = editedFixture.body;
      expect(statusCode).toBe(200);
      expect(message).toBe('Team details updated successfully');
      expect(payload).toMatchObject({
        date: expect.any(String),
        time: expect.any(String),
        homeTeam: expect.any(String),
        awayTeam: expect.any(String),
        status: expect.any(String),
        goalsHomeTeam: expect.any(String),
        goalsAwayTeam: expect.any(String)
      });
    });

    it('Should return an error code when the fixture is not found', async () => {
      const editedFixture = await request(app)
        .put(`/api/v1/admin/edit-fixture/5d7856dd4d2618a1292c2ff7`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          goalsAwayTeam: '2',
          goalsHomeTeam: '3',
          status: 'Pending'
        });

       console.log(editedFixture.body,'check this to see')
    });
  });

  //  refactor search method for teams
  describe('#Search', () => {
    it('User should be able to search for fixture', async () => {
      const searchResult = await request(app).get('api/v1/fixtures/search'
      ).query('search=man');
       console.log(searchResult,'rukee what')
    });
  });

  describe('#Delete', () => {
    it('An admin should be able to delete a fixture', async () => {
      const deletedFixture = await request(app)
        .delete(`/api/v1/admin/remove-fixture/${fixtureId}`)
        .set('Authorization', `Bearer ${adminToken}`);
        const { statusCode, message, payload } =deletedFixture.body;
        expect(statusCode).toBe(200);
        expect(message).toBe('Successfully deleted');
        expect(payload).toBeDefined();
    });
    
  });


  describe('#Pending', () => {
    it('A user should be able to get pending fixtures', async () => {
      const pendingFixture = await request(app)
        .get(`/api/v1/fixtures/pending`)
        .set('Authorization', `Bearer ${adminToken}`);
        const { statusCode, message, payload } = pendingFixture.body;
        expect(statusCode).toBe(200);
        expect(message[0]).toMatchObject({
          date: expect.any(String),
          time: expect.any(String),
          homeTeam: expect.any(String),
          awayTeam: expect.any(String),
          status: expect.any(String),
          goalsHomeTeam: expect.any(String),
          goalsAwayTeam: expect.any(String)
        });
       
    });
  });


  describe('#Completed', () => {
    it('A user should be able to get completed fixtures', async () => {
      const pendingFixture = await request(app)
        .get(`/api/v1/fixtures/completed`)
        .set('Authorization', `Bearer ${adminToken}`);
        const { statusCode, message, payload } = pendingFixture.body;
        expect(statusCode).toBe(200);
        expect(message).toEqual([]);
    });
  });

  describe('#Completed', () => {
    it('A user should be able to get completed fixtures', async () => {
      const pendingFixture = await request(app)
        .get(`/api/v1/fixtures/completed`)
        .set('Authorization', `Bearer ${adminToken}`);
        const { statusCode, message, payload } = pendingFixture.body;
        expect(statusCode).toBe(200);
        expect(message).toEqual([]);
    });
  });
});
