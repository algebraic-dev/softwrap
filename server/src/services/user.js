const { userModel, conn } = require('./database.js');

const userAttributes = [
  'id',
  'fullname',
  'civil_state',
  'cpf',
  'city',
  'state',
  'birthday',
];

const getUser = (req, res) => {
  userModel
    .findOne({
      attributes: userAttributes,
      where: { id: req.params.id },
    })
    .then((data) => {
      if (data) {
        res.json(data.dataValues).status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(() => {
      res.status(400).end();
    });
};

const modifyUser = async (req, res) => {
  if (Number.isNaN(req.params.id)) {
    res.status(400).end();
    return;
  }
  const data = await userModel.findOne({
    attributes: userAttributes,
    where: { id: req.params.id },
  });
  if (data) {
    const info = await data.update(req.body);
    delete info.dataValues.updatedAt;
    res.json(info.dataValues).status(200).end();
  } else {
    res.status(404).end();
  }
};

const deleteUser = (req, res) => {
  userModel
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => res.status(200).end())
    .catch(() => res.status(400).end());
};

const createUser = (req, res) => {
  userModel
    .create(req.body)
    .then((data) => {
      res.status(200).json(data.dataValues).end();
    })
    .catch(() => {
      res.status(400).end();
    });
};

const listUsers = async (req, res) => {
  const count = await userModel.count({});
  const data = (
    await userModel.findAll({
      attributes: userAttributes,
      order: conn.literal('id DESC'),
      limit: 10,
      offset: Number.isNaN(req.params.page)
        ? 0
        : parseInt(req.params.page, 10) * 10,
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
