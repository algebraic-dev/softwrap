const request = require('supertest');
const faker = require('faker-br');
const app = require("../src/server.js");
function generateUser() {
  return {
    fullname: faker.name.findName(),
    age: Math.floor(Math.random()*100),
    civil_state: Math.floor(Math.random() * 5),
    cpf: faker.br.cpf(),
    city: faker.address.city(),
    state: faker.address.stateAbbr()
  }
}


describe('test of CRUD operations', () => {

  beforeAll(async () => {
    await require('../src/services/database.js').startDB();
  });

  afterAll(async () => {
    await require('../src/services/database.js').sequelize.close()
  })

  it('Create user and check if it exists', (done) => {
    let user = generateUser();
    request(app)
      .post('/user/new')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(200);
        user.id = response.body.id;

        request(app)
          .get('/user/' + response.body.id)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual(user);
            done()
          })
      })
      .catch((err) => done(err))
  });

  it('Updates the user that does not exists', done => {
    let user = generateUser();
    request(app)
      .put('/user/1203')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(404)
        done()
      })
      .catch((err) => done(err))
  })

  it('Updates the user that actually exists', done => {
    let user = generateUser();
    request(app)
      .post('/user/new')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(200);
        user = generateUser();
        user.id = response.body.id;
        request(app)
          .put(`/user/${user.id}`)
          .send(user)
          .then((response) => {
            expect(response.status).toBe(200)
            done()})
          .catch((err) => done(err))
      })
  })


  it('Deletes the user', done => {
    let user = generateUser();
    request(app)
      .post('/user/new')
      .send(user)
      .then((response) => {
        request(app)
          .delete(`/user/${response.body.id}`)
          .then((response) => {
            expect(response.status).toBe(200)
            done()})
          .catch((err) => done(err))
    })
  })

});