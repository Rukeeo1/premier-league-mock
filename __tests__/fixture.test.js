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

afterAll(async () => {
  await User.deleteMany().exec();
  await TeamModel.deleteMany().exec();
  // mongoose.connection.close();
});
beforeAll(async () => {
  await TeamModel.deleteMany().exec();
  //register user...
  const userSignUp = await request(app)
    .post('/api/v1/user')
    .send(user);
  user = userSignUp.body;


  //admin signup...
  const adminSignUp = await request(app)
    .post('/api/v1/admin')
    .send(admin);
  admin = adminSignUp.body;

  console.log(admin, 'hello  admin')

  //login admin and get token:
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
    .send(teamOne);

  teamOne = addTeam.body;
  teamOneId = addTeam.body.payload._id;

  //create add team
  const addTeamTwo = await request(app)
    .post('/api/v1/admin/add-team')
    .set('Authorization', `Bearer ${token}`)
    .send(teamTwo);
  //  console.log(teamId.body,'hello rukee')
  teamTwo = addTeamTwo.body;
  teamTwoId = addTeamTwo.body.payload._id;


  //create fixture
  let fixture = {
    date: '29-11-2012',
    time: ' 11:48PM',
    status: 'Pending',
    venue: 'Old Trafford',
    homeTeam: teamOneId,
    awayTeam: teamTwoId,
    homeTeamName: 'Manchester United',
    awayTeamName: 'Arsenal Football Club'
  };

  const createFixture = await request(app)
    .post('/api/v1/admin/fixtures')
    .set('auth-token', token)
    .send(fixture)
    .expect(200);
});



describe('#FIXTURES routes', () => {
  describe('#Adding Fixtures', () => {
    it('Should allow an admin create teams', async () => {
      let fixture =
      {
        "time": "12:30PM",
        "venue": "Old Trafford",
        "homeTeam": teamOneId,
        "awayTeam": teamTwoId,
        "awayTeamName": 'Manchester United',
        "homeTeamName": 'Arsenal Football Club',
        "date": "12:15pm"
      }
      console.log(teamOneId, 'hee')
      //login admin and get token:
      const adminLogin = await request(app)
        .post('/api/v1/auth/admin-login')
        .send({
          email: 'admin@gmail.com',
          password: '123456'
        });

      //extract token...
      const { payload: token } = adminLogin.body;
      // console.log(token,'hello rukee tokne')

      const addFixture = await request(app)
        .post('/api/v1/admin/fixtures')
        .set('Authorization', `Bearer ${token}`)
        .send(fixture).expect(200)

      console.log(addFixture.body, 'this si body')
      const { message, statusCode, payload } = addFixture.body;
      expect(addFixture.statusCode).toBe(200)
      expect(message).toBe("fixture successfully create")
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


      // console.log(addFixture,'ruke is a good')

    })
  })
})