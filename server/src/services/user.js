const {sequelize} = require('./database.js');
const Sequelize = require('sequelize');
let userModel = require('../models/user.js')(sequelize, Sequelize);

let filterUser = user => {
  delete user.createdAt;
  delete user.updatedAt;
  return user
}

const getUser = async (req, res) => {
  let data = (await userModel.findOne({
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'birthday'],
    where: {id: req.params.id},
  }));
  if(data){
    res.json(data.dataValues).status(200).end();
  } else{
    res.json({}).status(404).end()
  }
};

const modifyUser = async (req, res) => {
  let data = (await userModel.findOne({
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'birthday'],
    where: {id: req.params.id},
  }));
  if(data){
    let info = await data.update(req.body);
    delete info.dataValues.updatedAt;
    res.json(info.dataValues).status(200).end();
  }else{
    res.status(404).json({}).end();
  }
};

const deleteUser = async (req, res) => {
  await userModel.destroy({
    where: {
      'id': req.params.id
    }
  });
  res.json({}).status(200);
};

const createUser = async (req,res) => {
  userModel.create(req.body)
  .then((data) => {
    res.status(200).json(filterUser(data.dataValues)).end();
  })
  .catch(() => {
    res.status(204).end();
  })
  //throw new Error('Not Implemented');
};

const listUsers = async (req, res) => {
  let data = (await userModel.findAll({
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'birthday']
  })).map(data => data.dataValues);
  res.json(data).status(200).end();
};

module.exports = {
  getUser,
  modifyUser,
  deleteUser,
  listUsers,
  createUser,
};
