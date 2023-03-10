const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const pick = require('../utils/pick');

const getAllProduct = catchAsync(async (req, res) => {
  console.log('page', req.query.page);
  let perPage = 6;
  let page = req.query.page || 1;
  let filter = pick(req.query, ['categoryId', 'typeProductId', 'name']);
  let query= {};

  if (filter.categoryId) {
    query.categoryId = filter.categoryId || {};
  }

  if (filter.categoryId && filter.typeProductId) {
    query.typeProductId = filter.typeProductId;
  }

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  const allProduct = await productService.getAllProducts(perPage, page, query);
  res.send(allProduct);
});
function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
function getTime() {
  const d = new Date();
let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let s = addZero(d.getSeconds());
console.log(h + m  + s);
return h + m  + s;
}
const createProduct = catchAsync(async (req, res) => {
  console.log(req.body.imgProduct);
  console.log(req.files);
  const productImg = [];
  if (req.files) {
    req.files.forEach((item) => productImg.push(item.filename));
  } else {
    productImg.push();
  }
  console.log("bodyname");
  console.log(req.body.name);
  const codeProductRandom = removeAccents(req.body.name).split(' ').join('').slice(0, 3) + req.body.categoryId.slice(8, 10) + req.body.typeProductId.slice(6, 8) + getTime();
  const result = { ...req.body, imgProduct: productImg, productCode: codeProductRandom };
  console.log(result);
  const product = await productService.createProduct(result);
  res.send(product);
});

const getProductId = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  console.log(req.params.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  console.log(req.files);
  const productImg = [];
  if (req.files) {
    req.files.forEach((item) => productImg.push(item.filename));
  } else {
    productImg.push();
  }
  console.log(productImg);
  const result = { ...req.body, imgProduct: productImg};
  console.log('đây là result', result);
  const product = await productService.updateProductById(req.params.id, result);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProductId,
  updateProduct,
  deleteProduct,
  getAllProduct,
};
