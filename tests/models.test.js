import { MongoClient } from "mongodb";
import { describe, expect, test } from "@jest/globals";

/* describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
    const products = db.collection("products");
    await db.collection("products").deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  test("should insert a doc into collection", async () => {
    const products = db.collection("products");

    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£2.99",
    };
    await products.insertOne(mockProduct);

    const insertedProduct = await products.findOne({ stock_number: "12345" });
    expect(insertedProduct).toEqual(mockProduct);
  });
}); */

import { client, products } from "../models/products.model.js";

describe("Insert, Put and Get", () => {
  beforeEach(async () => {
    await products.deleteMany({});
  });

  afterAll(async () => {
    await client.close();
  });

  test("Given a document, when called, should insert that document and be able to retrieve it", async () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    await products.insertOne(mockProduct);

    const insertedProduct = await products.findOne({ stock_number: "12345" });
    expect(insertedProduct).toEqual(mockProduct);
  });
  test("Given a document and an update, when called, should insert that document and edit it successfully", async () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    await products.insertOne(mockProduct);

    const filter = { stock_number: "12345" };
    // update the value of the 'z' field to 42
    const updateProduct = {
      $set: {
        stock_number: "12345",
        name: "Pro Batteries",
        Description: "Batteries",
        Price: "£2.99",
      },
    };
    const result = await products.updateOne(filter, updateProduct);
    expect(result.modifiedCount).toEqual(1);
  });
});
