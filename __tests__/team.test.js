const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user.model');
const TeamModel = require('../models/team.model');

//how do i create a user...
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


beforeEach(async () => {
   const userSignUp = await request(app)
   .post('/api/v1/user')
   .send(user);
 user = userSignUp.body;

  //create admin and login
  const adminSignUp = await request(app)
    .post('/api/v1/admin')
    .send(admin);
  admin = adminSignUp.body;

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

        // console.log(adminLogin.body,'hello')
 
      //get token
      const { payload: token } = adminLogin.body;

      //create team...
      const addTeam = await request(app)
        .post('/api/v1/admin/add-team')
        .set('Authorization', `Bearer ${token}`)
        .send(teamOne)
        .expect(200);

      const { statusCode, message, payload } = addTeam.body;
      console.log(statusCode,'www')
      expect(statusCode).toBe(200);
      expect(message).toBe('team created');
      expect(payload).toBeDefined();
      expect(payload.name).toMatch(/Manchester United/i);
    });

  })
})