const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { typeProductService } = require('../services');
const { Console } = require('winston/lib/winston/transports');

const getAllTypeProducts = catchAsync(async (req, res) => {
  const allCategory = await typeProductService.getAllTypeProduct();
  res.send(allCategory);
})

const createProductType = catchAsync(async (req, res) => {
  const TypeProduct = await typeProductService.createTypeProduct(req.body);
  res.send(TypeProduct)
});

const getTypeProductId = catchAsync(async (req, res) => {
  const TypeProduct = await typeProductService.getTypeProductById(req.params.id);
  if (!TypeProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TypeProduct not found');
  }
  res.send(TypeProduct);
});

const updateTypeProduct = catchAsync(async (req, res) => {
  const TypeProduct = await typeProductService.updateTypeProductById(req.params.id, req.body);
  res.send(TypeProduct);
});

const deleteTypeProduct = catchAsync(async (req, res) => {
  await typeProductService.deleteTypeProductById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// const getAllCategories = catchAsync(async (req, res) => {

// })


module.exports = {
  createProductType,
  getTypeProductId,
  updateTypeProduct,
  deleteTypeProduct,
  getAllTypeProducts,
};