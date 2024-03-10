const { User } = require('../models');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const tokenBlacklist = new Set();

const register = async (req, res) => {
  const { name, email, password, confPassword, familyEmail } = req.body;
  const cekEmail = await User.findOne({ where: { email: email } });
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(password, salt);

  if (!name || !email || !familyEmail || !password || !confPassword) return res.status(400).json({ code: 400, message: 'Error, Please All Fields are required to filled' });
  if (password !== confPassword) return res.status(400).json({ code: 400, message: 'Error, Please Password and Password Confirmation must be same' });
  if (!validator.isEmail(email) || !validator.isEmail(familyEmail)) return res.status(400).json({ code: 400, message: 'Error, Please Invalid Email Type' });
  if (cekEmail) return res.status(400).json({ code: 400, message: 'Error, Email was already used, Please use another email' });

  try {
    await User.create({
      name: name,
      email: email,
      roles: 'user',
      familyEmail: familyEmail,
      password: hashPass,
    });
    return res.status(201).json({
      code: 201,
      message: 'Success, Your account has been successfully created',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Server Error',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ code: 400, message: 'Error, Please All Fields are required to filled' });
  if (!validator.isEmail(email)) return res.status(400).json({ code: 400, message: 'Error, Please Invalid Email Type' });

  const cekUser = await User.findOne({ where: { email: email } });
  if (!cekUser) return res.status(401).json({ code: 401, message: 'Error, Your Account is Not Found' });

  const passMatched = await bcrypt.compare(password, cekUser.password);
  if (!passMatched) return res.status(401).json({ code: 401, message: 'Error, Your Account is Not Found' });

  const payload = {
    id: cekUser.id,
    name: cekUser.name,
    email: cekUser.email,
    roles: cekUser.roles,
    familyEmail: cekUser.familyEmail,
  };
  const token = jwt.sign(payload, process.env.TOKEN);
  await User.update(
    {
      token: token,
    },
    {
      where: {
        email: email,
      },
    }
  );
  return res.status(200).json({ code: 200, message: 'Successfull Login', token: token, role: cekUser.roles });
};

const getUsers = async (req, res) => {
  const id = req.userData.id;
  try {
    const data = await User.findOne({ where: { id: id } });
    return res.status(200).json({
      code: 200,
      message: 'Detail User',
      data: {
        name: data.name,
        email: data.email,
        familyEmail: data.familyEmail,
      },
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: 'Error' });
  }
};

const updateUsers = async (req, res) => {
  const id = req.userData.id;
  const { name, email, familyEmail } = req.body;

  try {
    await User.update(
      {
        name,
        email,
        familyEmail,
      },
      { where: { id: id } }
    );
    return res.status(201).json({ code: 201, message: 'User Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ code: 500, message: 'Error' });
  }
};

const logout = async (req, res) => {
  const id = req.userData.id;
  const token = req.headers['authorization'];

  try {
    await User.update(
      {
        token: null,
      },
      {
        where: {
          id: id,
        },
      }
    );
    tokenBlacklist.add(token);
    if (!tokenBlacklist) {
      return res.status(400).json({ code: 400, message: 'Gagal Logout' });
    }
    return res.status(200).json({ code: 200, message: 'Successfull Logout' });
  } catch (error) {
    return res.status(400).json({ code: 400, message: 'Error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUsers,
  updateUsers,
};
