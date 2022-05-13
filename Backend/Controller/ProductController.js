const Product = require ('../Model/Product');

//getProduct
const GetProducts = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status (200).json (product);
  } catch (error) {
    return res.status (500).json (error);
  }
};

// getProductById
const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status (200).json (product);
  } catch (error) {
    return res.status (500).json (error);
  }
};

// create Product
const CreateProducts = async (req, res) => {
    const CreateProducts = new Product({
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration,
    })
    try {
      const addProduct = await CreateProducts.save();
      return res.status (200).json (addProduct);
    } catch (error) {
      return res.status (500).json (error);
    }
  };

module.exports = {
  GetProducts,
  CreateProducts,
  GetProductById,
};