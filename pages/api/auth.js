const jwt = require('jsonwebtoken');
const { models } = require('../../db');
const secret = '5tQ6aAmA-LaxDC7h6kV7-3C6Rg!AV5';

const createToken = ({ id, role }) => jwt.sign({ id, role }, secret);

const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return models.User.findOne({ id: user.id });
  } catch (e) {
    return null;
  }
};

module.exports = {
  getUserFromToken,
  createToken,
};
