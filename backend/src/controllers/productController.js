const Product = require("../schema/productSchema");

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

exports.getProductByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.param.restaurant;
    const products = await Product.find({ restaruant: restaurantId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

exports.getProductByid = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      disponibilidad,
      ingredientes,
      restaurantId,
    } = req.body;
    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      categoria,
      disponibilidad,
      ingredientes,
      restaurant: restaurantId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const update = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, update, {
      new: true,
    });
    if (updatedProduct) {
      res.json({ messages: "Product Updated Successfully", updatedProduct });
    } else {
      res.status(404).json({});
    }
  } catch (erroe) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.json({ message: "product deleted successfully", deletedProduct });
    } else {
      res.status(500).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
