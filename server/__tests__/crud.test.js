const request = require('supertest');
const faker = require('faker-br');
const Sequelize = require('sequelize').DataTypes;
const app = require('../src/server.js');
const DB = require('../src/services/database.js');
const fs = require('fs');

function generateUser() {
  return {
    fullname: faker.name.findName(),
    birthday: faker.date.between('1950-01-01', '2020-01-01').toISOString(),
    civil_state: Math.floor(Math.random() * 5),
    cpf: faker.br.cpf(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
  };
}

describe('test of CRUD operations', () => {
  beforeAll(async () => {
    await DB.startDB();
    await DB.conn.getQueryInterface().createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      civil_state: {
        type: Sequelize.INTEGER,
      },
      cpf: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  });

  afterAll(async () => {
    await DB.sequelize.close();
    await DB
      .conn.getQueryInterface()
      .dropTable('users');
    fs.rm('./test.sqlite');
  });

  it('Create user and check if it exists', (done) => {
    const user = generateUser();
    request(app)
      .post('/user/new')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(200);
        user.id = response.body.id;

        request(app)
          .get(`/user/${response.body.id}`)
          .then((resp) => {
            expect(resp.status).toBe(200);
            expect(resp.body).toEqual(user);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('Updates the user that does not exists', (done) => {
    const user = generateUser();
    request(app)
      .put('/user/1203')
      .send(user)
      .then((resp) => {
        expect(resp.status).toBe(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('Updates the user that actually exists', (done) => {
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
          .then((resp) => {
            expect(resp.status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Deletes the user', (done) => {
    const user = generateUser();
    request(app)
      .post('/user/new')
      .send(user)
      .then((response) => {
        request(app)
          .delete(`/user/${response.body.id}`)
          .then((resp) => {
            expect(resp.status).toBe(200);
            done();
          })
          .catch((err) => done(err));
      });
  });
});
