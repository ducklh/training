const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Categories = require('../models/categories.models');
const ApiError = require('../utils/ApiError');

const getAllCategories = async () => {
  const categories = await Categories.find({}).populate('category');
  return categories;
}
/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}/
 */

const createCategory = async (categoryBody) => {
  //const category = await Category.create(categoryBody);
  const category = new Categories(categoryBody);
  await category.save();
  return category;
};

/**
 * 
 * @param {*} id 
 * @returns 
 */

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id, category) => {
  return Categories.findById({ _id: id, category });
};


/**
 * Update category by id
 * @param {ObjectId} id
 * @param {Object} updateCategory
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (id, updateBody) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories,
};
