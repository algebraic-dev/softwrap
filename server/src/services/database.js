const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

function startDB() {
    if (process.env.NODE_ENV != 'test') {
        (async () => {
            try {
                await sequelize.authenticate();
                console.log('Connected to DB');
            } catch (error) {
                console.error('Unable to connect to DB', error);
                process.exit(1);
            }
        })();
    }
}

module.exports = {conn: sequelize, startDB, Sequelize};
