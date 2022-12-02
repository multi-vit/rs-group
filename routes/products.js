import express from "express";
import {
  addNewProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import validateProduct from "../middlewares/validateProduct.middleware.js";

const router = express.Router();

// GET all products
router.get("/", async function (req, res, next) {
  const products = await getAllProducts();
  console.log(products);
  if (products.length > 0) {
    res.status(200).json({ status: "Success", payload: products });
  } else {
    res.status(200).json({
      status: "Success",
      message: "There are no products in the database",
    });
  }
});

// GET individual product by stock number
router.get("/:stockNumber", async function (req, res, next) {
  if (req.params.stockNumber !== undefined) {
    const product = await getProduct(req.params.stockNumber);
    console.log(product);
    if (Boolean(product)) {
      res.status(200).json({ status: "Success", payload: product });
    } else {
      res.status(404).json({
        status: "Failure",
        message: "No product found with that stock number",
      });
    }
  } else {
    res.status(400).json({
      status: "Failure",
      message: "Please provide a valid stock number. e.g. /products/12345",
    });
  }
});

router.post("/", async function (req, res, next) {
  const validProduct = validateProduct(req.body);
  if (validProduct.result) {
    const result = await addNewProduct(validProduct.product);
    console.log(result);
    if (result.acknowledged === true) {
      res
        .status(201)
        .json({ status: "Success", inserted_product: validProduct.product });
    } else {
      res.status(500).json({
        status: "Failure",
        message: "Sorry, we are having trouble adding that product",
      });
    }
  } else if (validProduct.result === false) {
    res.status(400).json({
      status: "Failure",
      message: `Please provide a ${validProduct.missing}. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`,
    });
  } else {
    res.status(500).json({
      status: "Failure",
      message: `Sorry, we are having trouble adding that product`,
    });
  }
});

export default router;
