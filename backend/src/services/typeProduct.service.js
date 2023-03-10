const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const TypeProduct = require('../models/typeProduct.models');
const ApiError = require('../utils/ApiError');

const getAllTypeProduct = async () => {
  const typeProducts = await TypeProduct.find({}).populate('typeProduct');
  return typeProducts;
}
/**
 * Create a category
 * @param {Object} typeProductBody
 * @returns {Promise<TypeProduct>}/
 */

const createTypeProduct = async (typeProductBody) => {
  const typeProduct = new TypeProduct(typeProductBody);
  await typeProduct.save();
  return typeProduct;
};

/**
 * 
 * @param {*} id 
 * @returns 
 */

/**
 * Get TypeProduct by id
 * @param {ObjectId} id
 * @returns {Promise<TypeProduct>}
 */
const getTypeProductById = async (id, typeProduct) => {
  return TypeProduct.findById({ _id: id, typeProduct });
};


/**
 * Update TypeProduct by id
 * @param {ObjectId} id
 * @param {Object} updateTypeProduct
 * @returns {Promise<TypeProduct>}
 */
const updateTypeProductById = async (id, updateBody) => {
  const typeProduct = await getTypeProductById(id);
  if (!typeProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TypeProduct not found');
  }
  Object.assign(typeProduct, updateBody);
  await typeProduct.save();
  return typeProduct;
};

/**
 * Delete category by id
 * @param {ObjectId} TypeProductId
 * @returns {Promise<TypeProduct>}
 */
const deleteTypeProductById = async (id) => {
  const typeProduct = await getTypeProductById(id);
  if (!typeProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TypeProduct not found');
  }
  await typeProduct.remove();
  return typeProduct;
};

module.exports = {
  createTypeProduct,
  getTypeProductById,
  updateTypeProductById,
  deleteTypeProductById,
  getAllTypeProduct,
};
