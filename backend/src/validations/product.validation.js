const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    productCode: Joi.string().min(3).max(30).required(),
    categoryId: Joi.string(),
    typeProductId: Joi.string(),
    price: Joi.number().precision(2).required(),
    description: Joi.string().required(),
    imgProduct: Joi.string(),
  })
};

const getAllProduct = {
  query: Joi.object().keys({
    name: Joi.string(),
    productCode: Joi.string(),
    categoryId: Joi.string(),
    typeProductId: Joi.string(),
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
  })
};

const getProductId = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    productCode: Joi.string().min(3).max(30).required(),
    categoryId: Joi.string(),
    typeProductId: Joi.string(),
    price: Joi.number().precision(2).required(),
    description: Joi.string().required(),
    imgProduct: Joi.string(),
  }).
    min(1)
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string(),
  })
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductId,
  getAllProduct,
};