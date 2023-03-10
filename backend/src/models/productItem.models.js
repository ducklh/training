const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Categories',
      required: true,
    },
    typeProductId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'typeProduct',
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    // slug: {
    //   type: String,
    //   slug: 'name',
    //   unique: true
    // },
    imgProduct: [
      {
        type: String,
        require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef Products
 */
const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
