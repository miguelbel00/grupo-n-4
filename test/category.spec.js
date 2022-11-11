const request = require('supertest')
const { expect } = require('chai')
const { Category } = require('../database/models')

const app = require('../app')

let token, id;

describe('[TEST-CATEGORIES]', () => {
  const updateCategory = {
    name: "canceledModified",
    description: "modified description test"
  }
  const createCategory = {
    name: "Canceled",
    description: "description test"
  }
  const createBadCategory = {
    name: 23,
    description: false
  }
  before(async () => {
    const { body } = await request(app).post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'Richard@mail.com',
        password: '123456'
      })
      .expect('Content-Type', /json/)

    const { body: response } = body;
    token = response.token
    id = response.user.id
  })

  describe('[LIST-CATEGORY]', () => {
    it('should return a list of categories', async () => {
      const { body } = await request(app)
        .get('/categories')
        .set('Authorization', token)
        .set('Accept', 'aplication/json')
        .expect('Content-type', /json/)

      const { code, message, body: response } = body
      expect(body.code).to.be.a('number')
      expect(code).to.equal(200);
      expect(message).to.equal('Categories Searched');
      expect(response).to.be.a('array');
    })
  })

  describe('[CREATE-CATEGORY]', () => {
    it('should return an create category', async () => {
      const { body } = await request(app).post(`/categories`)
        .send(createCategory)
        .set('Accept', 'aplication/json')
        .expect('Content-Type', /json/)
      const { code, message, body: response } = body

      expect(code).to.be.a('number');
      expect(code).to.equal(200);

      expect(message).to.equal('Category created');
      expect(response).to.be.a('object');
    })

    it(`should return an error Category creation failed`, async () => {
      const { error } = await request(app).post(`/categories`)
        .send(createBadCategory)
        .set('Accept', 'aplication/json')
        .expect('Content-Type', /text\/html/)
      const { status, text } = error
      expect(status).to.be.a('number');
      expect(status).to.equal(404);
      expect(text).to.be.a('string');
      expect(text).to.contain('missing or wrong parameter')
    })

  })

  describe('[UPDATE-CATEGORY]', () => {
    it(`should return an error the Category not exists`, async () => {

      const { error } = await request(app).put(`/categories/98`)
        .send(updateCategory)
        .set('Accept', 'aplication/json')
        .expect('Content-Type', /text\/html/)

      const { status, text } = error
      expect(status).to.be.a('number');
      expect(status).to.equal(404);
      expect(text).to.be.a('string');
      expect(text).to.contain('Category not found')
    })

    it('should return an update category', async () => {
      const category = await Category.findOne({ where: { id:1 } });
      const { body } = await request(app).put(`/categories/${category.id}`)
        .send(updateCategory)
        .set('Accept', 'text/html; charset=utf-8')
        .expect('Content-Type', /json/)
      const { code, message, body: response } = body

      expect(code).to.be.a('number');
      expect(code).to.equal(200);
      expect(message).to.equal('Category Update');
    })
  })
})