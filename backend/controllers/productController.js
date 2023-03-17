const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewars/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

const getProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage=2;
  const apitFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resultPerPage);
  const product = await apitFeatures.query;

  res.status(200).json({
    success: true,
    count: product.length,
    product,
  });
});

const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    //  return res.status(404).json({
    //     success: false,
    //     message: "product not found",
    //   });
    return next(new ErrorHandler("product not found", 400));
  }
  res.status(201).json({
    status: true,
    product,
  });
});

const newProducts = catchAsyncError(async (req, res, next) => {
  req.body.user=req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      status: false,
      message: "product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: true,
    product,
  });
};

const deletProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      status: false,
      message: "product not found",
    });
  }
  await Product.remove();
  res.status(201).json({
    status: true,
    message: "Product Deleted",
  });
};

module.exports = {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
};
