const request = require('supertest')
const { expect } = require('chai')
const { User } = require('../database/models')

const app = require('../app')

let token, id;

describe('[TEST-USERS]', () => {
  const updateUser = {
    firstName: 'updateTest111111111',
    lastname: 'updateTest1',
    email: 'Test1update@gmail.com',
    password: '123456'
  }
  const registerUser = {
    firstName: "test1",
    lastname: "lastTest1",
    password: '123456',
    avatar: "example",
    email: "test32323@gmail.com",
    roleId: 1
  }
  before(async () => {
    const { body } = await request(app).post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'Rosemary@mail.com',
        password: '123456'
      })
      .expect('Content-Type', /json/)

    const { body: response } = body;
    token = response.token
    id = response.user.id
  })

  describe('[CREATE-USER]', () => {
    it('should return an create user', async () => {
      const { body } = await request(app).post(`/auth/register`)
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
      const { error } = await request(app).post(`/auth/register`)
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
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'text/html; charset=utf-8')
        .expect('Content-Type',/text\/html/)

      const { status, text } = error
      expect(status).to.be.a('number');
      expect(status).to.equal(404);
      expect(text).to.be.a('string');
      expect(text).to.contain('The user not exists')
    })

    it('should return an update user', async () => {
      const user = await User.findOne({ where: { email: 'test32323@gmail.com' } });
      const { body } = await request(app).put(`/users/${user.id}`)
        .send(updateUser)
        .set('Authorization', `Bearer ${token}`)
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
      const user = await User.findOne({ where: { email: 'Test1update@gmail.com' } });
      const { body } = await request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
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

  describe('[LIST-USERS]', () => {
    it('should return a list of users', async () => {
      const { body } = await request(app)
        .get('/users/?page=1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('Content-type', /json/)

      const { code, message, body: response } = body
      expect(body.code).to.be.a('number')
      expect(code).to.equal(200);
      expect(message).to.equal('Users  retrieved successfully');
      expect(response).to.be.a('object');
    })
  })


})