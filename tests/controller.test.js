import { describe, expect, test } from "@jest/globals";
import {
  addNewProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { client, products } from "../models/products.model.js";

describe("Create, Get (all and individual) and Update", () => {
  beforeEach(async () => {
    await products.deleteMany({});
  });

  test("Given a product, when called, addNewProduct should insert that document", async () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    await addNewProduct(mockProduct);

    const insertedProduct = await products.findOne({ stock_number: "12345" });
    expect(insertedProduct).toEqual(mockProduct);
  });

  test("Given a stock number, when called, getProduct should retrieve the product with that stock number", async () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    await products.insertOne(mockProduct);

    const insertedProduct = await getProduct(mockProduct.stock_number);
    expect(insertedProduct).toEqual(mockProduct);
  });

  test("Given no input, when called, getAllProducts should retrieve all products sorted by ascending stock number", async () => {
    const mockProducts = [
      {
        stock_number: "1",
        name: "Pro Batteries",
        Description: "Batteries",
        Price: "£1.99",
      },
      {
        stock_number: "2",
        name: "Raspberry Pi 4",
        Description: "Hardware",
        Price: "£40.67",
      },
    ];
    await products.insertMany(mockProducts);

    const insertedProducts = await getAllProducts();
    expect(insertedProducts.length).toEqual(2);
  });

  test("Given a stock number and product to update , when called, updateProduct successfully updates the relevant document ", async () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    await products.insertOne(mockProduct);

    const stockNumber = "12345";
    const productToUpdate = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£2.99",
    };
    const result = await updateProduct(stockNumber, productToUpdate);
    expect(result.modifiedCount).toEqual(1);
  });

  afterAll(async () => {
    await client.close();
  });
});
