const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getAllCategory = catchAsync(async (req, res) => {
  const allCategory = await categoryService.getAllCategories();
  res.send(allCategory);
})

const createCategory = catchAsync(async (req, res) => {

  const category = await categoryService.createCategory(req.body);
  //res.status(httpStatus.CREATED).send(category);
  res.send(category)
});

const getCategoryId = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.id, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// const getAllCategories = catchAsync(async (req, res) => {

// })


module.exports = {
  createCategory,
  getCategoryId,
  updateCategory,
  deleteCategory,
  getAllCategory,
};