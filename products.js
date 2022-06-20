const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ msg: products });
};

const getAllProducts = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log(queryObject);

  //Querying 'Product' for when featured is false returns an empty array.
  //"setOptions" was suggested as a way to rectify that error. I still get the same results.
  const products = await Product.find(queryObject).setOptions({
    strict: false,
  });
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
