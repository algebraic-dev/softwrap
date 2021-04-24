const config = {
  development: {
    storage: './test.sqlite',
    dialect: 'sqlite',
  },
  test: {
    dialect: 'sqlite',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: '5432',
    dialect: 'postgres',
  },
};

module.exports = config;
