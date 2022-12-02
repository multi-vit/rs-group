import express from "express";
import {
  addNewProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import validateProduct from "../utils/validateProduct.util.js";

const router = express.Router();

// GET all products
router.get("/", async function (req, res, next) {
  const products = await getAllProducts();
  console.log(products);
  if (products.length > 0) {
    res.status(200).json({ success: true, payload: products });
  } else {
    res.status(404).json({
      success: false,
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
      res.status(200).json({ success: true, payload: product });
    } else {
      res.status(404).json({
        success: false,
        message: "No product found with that stock number",
      });
    }
  } else {
    res.status(400).json({
      success: false,
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
        .json({ success: true, inserted_product: validProduct.product });
    } else {
      res.status(500).json({
        success: false,
        message: "Sorry, we are having trouble adding that product",
      });
    }
  } else if (validProduct.result === false) {
    res.status(400).json({
      success: false,
      message: `Please provide a ${validProduct.missing}. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`,
    });
  } else {
    res.status(500).json({
      success: false,
      message: `Sorry, we are having trouble adding that product`,
    });
  }
});

router.put("/:stockNumber", async function (req, res, next) {
  const validProduct = validateProduct(req.body);
  if (validProduct.result) {
    const result = await updateProduct(
      req.params.stockNumber,
      validProduct.product
    );
    console.log(result);
    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, updated_product: validProduct.product });
    } else if (result.matchedCount > 0) {
      res.status(400).json({
        success: false,
        message:
          "The product was found but is identical to the update provided",
      });
    } else if (result.matchedCount === 0) {
      res.status(400).json({
        success: false,
        message: "No product with that stock number was found",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Sorry, we are having trouble updating that product",
      });
    }
  } else if (validProduct.result === false) {
    res.status(400).json({
      success: false,
      message: `Please provide a ${validProduct.missing}. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`,
    });
  } else {
    res.status(500).json({
      success: false,
      message: `Sorry, we are having trouble updating that product`,
    });
  }
});

export default router;
