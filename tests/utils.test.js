import { describe, expect, test } from "@jest/globals";
import validateStockNumber from "../utils/validateStockNumber.util";
import validateProduct from "../utils/validateProduct.util.js";

describe("validateProduct Utility Function", () => {
  test("Given a valid product, when called, validateProduct should return true and the valid product", () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    const expected = { result: true, product: mockProduct };
    const result = validateProduct(mockProduct);
    expect(result).toEqual(expected);
  });
  test("Given a product that omits stock_number, when called, validateProduct should return false and missing stock_number", () => {
    const mockProduct = {
      name: "Pro Batteries",
      Description: "Batteries",
      Price: "£1.99",
    };
    const expected = { result: false, missing: "stock_number" };
    const result = validateProduct(mockProduct);
    expect(result).toEqual(expected);
  });
  test("Given a product that omits name, when called, validateProduct should return false and missing name", () => {
    const mockProduct = {
      stock_number: "12345",
      Description: "Batteries",
      Price: "£1.99",
    };
    const expected = { result: false, missing: "name" };
    const result = validateProduct(mockProduct);
    expect(result).toEqual(expected);
  });
  test("Given a product that omits description, when called, validateProduct should return false and missing description", () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Price: "£1.99",
    };
    const expected = { result: false, missing: "Description" };
    const result = validateProduct(mockProduct);
    expect(result).toEqual(expected);
  });
  test("Given a product that omits price, when called, validateProduct should return false and missing price", () => {
    const mockProduct = {
      stock_number: "12345",
      name: "Pro Batteries",
      Description: "Batteries",
    };
    const expected = { result: false, missing: "Price" };
    const result = validateProduct(mockProduct);
    expect(result).toEqual(expected);
  });
});

describe("validateStockNumber Utility Function", () => {
  test("Given a valid stock number, when called, validateStockNumber should return true", () => {
    const mockStockNumber = "abcde12345";
    const expected = true;
    const result = validateStockNumber(mockStockNumber);
    expect(result).toEqual(expected);
  });
  test("Given a stock number that is not 10 characters, when called, validateStockNumber should return true", () => {
    const mockStockNumber = "1";
    const expected = false;
    const result = validateStockNumber(mockStockNumber);
    expect(result).toEqual(expected);
  });
  test("Given a stock number that contains non-alphanumeric characters, when called, validateStockNumber should return true", () => {
    const mockStockNumber = "123456789!";
    const expected = false;
    const result = validateStockNumber(mockStockNumber);
    expect(result).toEqual(expected);
  });
});
