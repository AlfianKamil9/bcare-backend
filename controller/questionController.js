//const Questions = require('../models/questions');

const { Question } = require('../models');

// GET ARTIKEL
const getQuestions = async (req, res) => {
  try {
    const data = await Question.findAll();
    return res.status(200).json({
      code: 200,
      message: 'Success Get Data Questions',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

module.exports = getQuestions;
