const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const conn = new Sequelize(config[process.env.NODE_ENV || "development"]);

const startDB = () => {
  conn.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch(() => {throw new Error("Unable to connect to DB")});
}

const userModel = require("../models/user.js")(conn, Sequelize);

module.exports = { userModel, startDB };
