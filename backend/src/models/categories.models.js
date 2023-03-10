const mongoose = require('mongoose');
// const { tokenTypes } = require('../config/tokens');

const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef Categories
 */
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
