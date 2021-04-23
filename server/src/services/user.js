const { userModel } = require('./database.js');

const filterUser = (user) => {
  const newUser = { ...user };
  delete newUser.createdAt;
  delete newUser.updatedAt;
  return user;
};

const getUser = (req, res) => {
  userModel
    .findOne({
      attributes: [
        'id',
        'fullname',
        'civil_state',
        'cpf',
        'city',
        'state',
        'birthday',
      ],
      where: { id: req.params.id },
    })
    .then((data) => {
      if (data) {
        res.json(data.dataValues).status(200).end();
      } else {
        res.status(404).json({ error: true });
      }
    })
    .catch(() => {
      res.status(204).json({ error: true });
    });
};

const modifyUser = async (req, res) => {
  if(isNaN( req.params.id)){
    return res.status(204).json({}).end();
  }
  const data = await userModel.findOne({
    attributes: [
      'id',
      'fullname',
      'civil_state',
      'cpf',
      'city',
      'state',
      'birthday',
    ],
    where: { id: req.params.id },
  });
  if (data) {
    const info = await data.update(req.body);
    delete info.dataValues.updatedAt;
    res.json(info.dataValues).status(200).end();
  } else {
    res.status(404).json({}).end();
  }
};

const deleteUser = async (req, res) => {
  await userModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({}).status(200);
};

const createUser = async (req, res) => {
  userModel
    .create(req.body)
    .then((data) => {
      res.status(200).json(filterUser(data.dataValues)).end();
    })
    .catch(() => {
      res.status(204).json({ erro: true }).end();
    });
};

const listUsers = async (req, res) => {
  const count = await userModel.count({});
  const data = (
    await userModel.findAll({
      attributes: [
        'id',
        'fullname',
        'civil_state',
        'cpf',
        'city',
        'state',
        'birthday',
      ],
      order: conn.literal('id DESC'),
      limit: 10,
      offset: Number.isNaN(req.params.page) ? 0 : parseInt(req.params.page, 10) * 10,
    })
  ).map((item) => item.dataValues);
  res
    .json({
      pages: Math.floor(count / 10),
      users: data,
    })
    .status(200)
    .end();
};

module.exports = {
  getUser,
  modifyUser,
  deleteUser,
  listUsers,
  createUser,
};
