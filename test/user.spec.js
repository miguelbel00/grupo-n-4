const request = require('supertest')
const { expect } = require('chai')
const { User } = require('../database/models')

const app = require('../app')

let token, id;

describe('[TEST-USERS]', () => {
  const updateUser = {
    firstName: 'updateTest111111111',
    lastname: 'updateTest1',
    email: 'Test1update@test1.com'
  }
  const registerUser = {
    firstName: "test1",
    lastname: "lastTest1",
    password: '123456',
    email: "test1@mail.com"
  }
  before(async () => {
    const { body } = await request(app).post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'mati@mail.com',
        password: '123456'
      })
      .expect('Content-Type', /json/)

    const { body: response } = body;
    token = response.token
    id = response.user.id
  })

  describe('[LIST-USERS]', () => {
    it('should return a list of users', async () => {
      const { body } = await request(app)
        .get('/users')
        .set('Authorization', token)
        .set('Accept', 'aplication/json')
        .expect('Content-type', /json/)

      const { code, message, body: response } = body
      expect(body.code).to.be.a('number')
      expect(code).to.equal(200);
      expect(message).to.equal('Users obtained');
      expect(response).to.be.a('array');
    })
  })

  describe('[CREATE-USER]', () => {
    it('should return an create user', async () => {
      const { body } = await request(app).post(`/users`)
        .send(registerUser)
        .set('Accept', 'aplication/json')
        .expect('Content-Type', /json/)
      const { code, message, body: response } = body

      expect(code).to.be.a('number');
      expect(code).to.equal(200);

      expect(message).to.equal('User created');
      expect(response).to.be.a('object');
    })

    it(`'should return an error User creation failed`, async () => {
      const { error } = await request(app).post(`/users`)
        .send(registerUser)
        .set('Accept', 'text/html; charset=utf-8')
        .expect('Content-Type', /text\/html/)
      const { status, text } = error
      expect(status).to.be.a('number');
      expect(status).to.equal(404);
    })

  })

  describe('[UPDATE-USER]', () => {
    it(`'should return an error The user not exists`, async () => {

      const { error } = await request(app).put(`/users/89`)
        .send(updateUser)
        .set('Accept', 'text/html; charset=utf-8')
        .expect('Content-Type', /text\/html/)

      const { status, text } = error
      expect(status).to.be.a('number');
      expect(status).to.equal(404);
      expect(text).to.be.a('string');
      expect(text).to.contain('The user not exists')
    })

    it('should return an update user', async () => {
      const user = await User.findOne({ where: { email: 'test1@mail.com' } });
      const { body } = await request(app).put(`/users/${user.id}`)
        .send(updateUser)
        .set('Accept', 'aplication/json')
        .expect('Content-Type', /json/)
      const { code, message, body: response } = body

      expect(code).to.be.a('number');
      expect(code).to.equal(200);
      expect(message).to.equal('User Update');
    })
  })

  describe('[DELETE-USER]', () => {
    it('should delete a user', async () => {
      const user = await User.findOne({ where: { email: 'Test1update@test1.com' } });
      const { body } = await request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', token)
        .set('Accept', 'aplication/json')
        .expect('Content-type', /json/)
      const { code, message, body: response } = body

      expect(code).to.be.a('number');
      expect(code).to.equal(200);
      expect(message).to.be.a('string');
      expect(message).to.equal('User successfully deleted');
      expect(response).to.equal(1)
    })
  })

})