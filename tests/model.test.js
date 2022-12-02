import { describe, expect, test } from "@jest/globals";
import { client, products } from "../models/products.model.js";

describe("Insert, Put and Get", () => {
  beforeEach(async () => {
    await products.deleteMany({});
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

  afterAll(async () => {
    await client.close();
  });
});
