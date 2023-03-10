const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Products = require('../models/productItem.models');
const ApiError = require('../utils/ApiError');

const getCountProduct = async (query) => {
  return Products.countDocuments(query);
}

const getAllProducts = async (perPage, page, query) => {
  const count = await getCountProduct(query);
  console.log('count', count);
  const products = await Products.find(query).skip((perPage * page) - perPage).limit(perPage);
  return {total: Math.ceil(count), data: products};
};
/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}/
 */

const createProduct = async (productBody) => {
  const product = new Products(productBody);
  await product.save();
  return product;
};

/**
 * 
 * @param {*} id 
 * @returns 
 */

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id, product) => {
  return Products.findById({ _id: id, product });
};


/**
 * Update product by id
 * @param {ObjectId} id
 * @param {Object} updateProduct
 * @returns {Promise<Product>}
 */
const updateProductById = async (id, updateBody) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
};
