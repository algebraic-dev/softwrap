const {conn, Sequelize} = require('./database.js');
let userModel = require('../models/user.js')(conn, Sequelize);

let filterUser = user => {
  delete user.createdAt;
  delete user.updatedAt;
  return user
}

const getUser = async (req, res) => {
  let data = (await userModel.findOne({
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'age'],
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
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'age'],
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
};

const listUsers = async (req, res) => {
  let count = await userModel.count({});
  let data = (await userModel.findAll({
    attributes: ['id', 'fullname', 'civil_state', 'cpf', 'city', 'state', 'age'],
    order: conn.literal('id DESC'),
    limit: 10, 
    offset: isNaN(req.params.page) ? 0 : parseInt(req.params.page)*10
  })).map(data => data.dataValues);
  res.json({
    pages: Math.floor(count/10),
    users: data
  }).status(200).end();
};

module.exports = {
  getUser,
  modifyUser,
  deleteUser,
  listUsers,
  createUser,
};
