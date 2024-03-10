const { User } = require('../../models');

const getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['name', 'email', 'familyEmail', 'roles'] });
  try {
    return res.status(200).json({
      code: 200,
      message: 'Success All Users',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error on server',
    });
  }
};

module.exports = {
  getAllUsers,
};
