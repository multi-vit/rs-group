import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import productsRouter from "./routes/products.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRouter);

app.use(function (req, res, next) {
  res.status(404).json({
    message:
      "Thank you for using our Products API. POST requests go to /products, PUT requests to /products/{stocknumber} and GET requests to /products/{stocknumber}. Omitting a stock number from the GET request will return all products.",
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
