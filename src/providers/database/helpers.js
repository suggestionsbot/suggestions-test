const db = require('../database');

const getSuggestion = ({ thread }) => {
  return db.get('suggestions').find({ thread }).value();
};

module.exports = {
  getSuggestion,
};
