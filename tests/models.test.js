import { MongoClient } from "mongodb";
import { describe, expect, test } from "@jest/globals";

describe("insert", () => {
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
});
