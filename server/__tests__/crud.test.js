const request = require('supertest');
const faker = require('faker-br');
const app = require("../src/server.js");
const { it } = require('faker-br/lib/locales');

function generateUser(){
  return {
    fullname: faker.name.findName(),
    birthday: faker.date.between('1980-01-01', '2020-01-01').getTime(),
    civil_status: Math.floor(Math.random()*5),
    cpf: faker.br.cpf(),
    city: faker.address.city(),
    state: faker.address.stateAbbr()
  }
}

describe('test of CRUD operations', async () => {
  it('Create user and check if it exists', async () => {
    let user = generateUser();

    let response = await request(app)
      .post('/user/')
      .send(user)

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(0);

    user.id = response.body.id;

    let response = await request(app)
      .get('/user/' + response.body.id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it('Updates the user that does not exists', () => {
    let user = generateUser();

    let response = await request(app)
      .put('/user/123')
      .send(user)

    expect(response.status).toBe(404)
  })

  it('Updates the user that actually exists', () => {
    let user = generateUser();

    let response = await request(app)
      .put('/user/0')
      .send(user)

    expect(response.status).toBe(200)
  })


  it('Deletes the user', () => {
    let user = generateUser();

    let response = await request(app)
      .delete('/user/0')
      .send(user)

    expect(response.status).toBe(200)
  })
});