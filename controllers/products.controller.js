// Put logic to handle CRUD requests here
import { client, products } from "../models/products.model.js";

export async function addNewProduct(product) {
  const result = await products.insertOne(product);
  return result;
}

export async function getProduct(stockNumber) {
  const result = await products.findOne({ stock_number: stockNumber });
  return result;
}

export async function getAllProducts() {
  const result = await products
    .find({}, { sort: { stock_number: 1 } })
    .toArray();
  return result;
}

export async function updateProduct(stockNumber, productToUpdate) {
  const filter = { stock_number: stockNumber };
  const updateProduct = {
    $set: productToUpdate,
  };
  const result = await products.updateOne(filter, updateProduct);
  return result;
}
