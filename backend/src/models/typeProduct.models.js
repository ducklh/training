const mongoose = require('mongoose');
// const { tokenTypes } = require('../config/tokens');

const typeProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Categories',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

const TypeProduct = mongoose.model('TypeProduct', typeProductSchema);

module.exports = TypeProduct;
