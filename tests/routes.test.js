import request from "supertest";
import { test, expect, describe } from "@jest/globals";
import app from "../app.js";
import { client, products } from "../models/products.model.js";

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

describe("Gets products from the database", function () {
  beforeEach(async () => {
    await products.deleteMany({});
    await products.insertMany(mockProducts);
  });
  test("Given a user makes a GET request to /products, when no stock number is provided, the route returns a response with the expected data shape", async function () {
    const response = await request(app)
      .get("/products")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          stock_number: expect.any(String),
          name: expect.any(String),
          Description: expect.any(String),
          Price: expect.any(String),
          _id: expect.any(String),
        }),
      ])
    );
  });
  test("Given a user makes a GET request to /products, when no stock number is provided, the route returns all products from the database", async function () {
    const response = await request(app)
      .get("/products")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
    expect(response.body.payload.length).toEqual(2);
  });
  test("Given a user makes a GET request to /products, when a stock number is provided, the route returns the matching product from the database", async function () {
    let expected = { ...mockProducts[1] };
    expected._id = expect.any(String);
    const response = await request(app)
      .get(`/products/${expected.stock_number}`)
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      payload: expect.any(Object),
    });
    expect(response.body.payload).toEqual(expected);
  });
  test("Given a user makes a GET request to /products, when there are no products in the database, the route returns a response explaining this", async function () {
    await products.deleteMany({});
    const response = await request(app)
      .get(`/products`)
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      success: false,
      message: "There are no products in the database",
    });
  });
  test("Given a user makes a GET request to /products/{stock_number}, when no matching products are found, the route returns a response explaining this", async function () {
    await products.deleteMany({});
    const response = await request(app)
      .get(`/products/1`)
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      success: false,
      message: "No product found with that stock number",
    });
  });
});

describe("Gets products from the database", function () {
  beforeEach(async () => {
    await products.deleteMany({});
  });
  test("Given a user makes a POST request to /products, when a valid product is provided, the route returns a response with the expected data shape", async function () {
    const response = await request(app)
      .post("/products")
      .set("Content-Type", "application/json")
      .send(mockProducts[0]);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      success: true,
      inserted_product: expect.objectContaining({
        stock_number: expect.any(String),
        name: expect.any(String),
        Description: expect.any(String),
        Price: expect.any(String),
        _id: expect.any(String),
      }),
    });
  });
  test("Given a user makes a POST request to /products, when a valid product is provided, the route returns a response confirming success and the product added", async function () {
    let expected = { ...mockProducts[1] };
    expected._id = expect.any(String);
    const response = await request(app)
      .post(`/products`)
      .set("Content-Type", "application/json")
      .send(mockProducts[1]);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      success: true,
      inserted_product: expect.any(Object),
    });
    expect(response.body.inserted_product).toEqual(expected);
  });
  test("Given a user makes a POST request to /products, when a product is provided with missing stock_number, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.stock_number;
    const response = await request(app)
      .post(`/products`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a stock_number. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a POST request to /products, when a product is provided with missing name, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.name;
    const response = await request(app)
      .post(`/products`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a name. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a POST request to /products, when a product is provided with missing Description, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.Description;
    const response = await request(app)
      .post(`/products`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a Description. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a POST request to /products, when a product is provided with missing Price, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.Price;
    const response = await request(app)
      .post(`/products`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a Price. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
});

describe("Updates product in the database", function () {
  beforeEach(async () => {
    await products.deleteMany({});
    await products.insertMany(mockProducts);
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a valid stock number is provided, the route returns a response with the expected data shape", async function () {
    let updatedProduct = { ...mockProducts[0] };
    updatedProduct.Price = "£2.99";
    const response = await request(app)
      .put(`/products/${updatedProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(updatedProduct);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      updated_product: expect.any(Object),
    });
    expect(response.body.updated_product).toEqual(
      expect.objectContaining({
        stock_number: expect.any(String),
        name: expect.any(String),
        Description: expect.any(String),
        Price: expect.any(String),
      })
    );
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a valid stock number is provided but there are no changes, the route returns the correct response", async function () {
    let updatedProduct = { ...mockProducts[0] };
    const response = await request(app)
      .put(`/products/${updatedProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(updatedProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: "The product was found but is identical to the update provided",
    });
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a valid stock number is provided, the route returns the correct response", async function () {
    let updatedProduct = { ...mockProducts[0] };
    updatedProduct.Price = "£2.99";
    let expected = { ...updatedProduct };
    delete expected._id;
    const response = await request(app)
      .put(`/products/${updatedProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(updatedProduct);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      updated_product: expected,
    });
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when an invalid stock number is provided, the route returns the correct response", async function () {
    let updatedProduct = { ...mockProducts[0] };
    updatedProduct.stock_number = "-1";
    const response = await request(app)
      .put(`/products/${updatedProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(updatedProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: "No product with that stock number was found",
    });
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a product is provided with missing stock_number, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.stock_number;
    const response = await request(app)
      .put(`/products/${invalidProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a stock_number. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a product is provided with missing name, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.name;
    const response = await request(app)
      .put(`/products/${invalidProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a name. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a product is provided with missing Description, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.Description;
    const response = await request(app)
      .put(`/products/${invalidProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a Description. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
  test("Given a user makes a PUT request to /products/{stock_number}, when a product is provided with missing Price, the route returns a response explaining what is missing", async function () {
    let invalidProduct = { ...mockProducts[0] };
    delete invalidProduct.Price;
    const response = await request(app)
      .put(`/products/${invalidProduct.stock_number}`)
      .set("Content-Type", "application/json")
      .send(invalidProduct);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
    expect(response.body.message).toEqual(
      `Please provide a Price. Your product should look like this: {stock_number: 12345, name: Pro Batteries, Description: Batteries, Price: £1.99}`
    );
  });
});

describe("Handles exceptions", function () {
  test("Given a user makes a request, when it is to an invalid route, the app returns the correct response", async function () {
    const response = await request(app)
      .get("/bob")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual(
      "Thank you for using our Products API. POST requests go to /products, PUT requests to /products/{stocknumber} and GET requests to /products/{stocknumber}. Omitting a stock number from the GET request will return all products."
    );
  });
  test("Given a user makes a request, when Content-Type is not application/json, the app returns the correct response", async function () {
    const response = await request(app)
      .get("/products")
      .set("Content-Type", "text/plain");
    expect(response.status).toEqual(400);
    expect(response.text).toEqual(
      "Sorry, we only accept application/json as content-type"
    );
  });
});

afterAll(async () => {
  await client.close();
});
