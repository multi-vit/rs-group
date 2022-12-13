# REST API

## Part 1 - Coding Test

Create a REST API using node.js and express that allows consumers to add, update and get product data. A sample project has been included to help you start off.

These are the queries that we should be able to send to the endpoint:

Add a new product
curl -X POST -H "Content-Type: application/json" \
 -d '{"stock_number":"12345","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}' \
 <http://localhost:8080/products>

Update an existing product
curl -X PUT -H "Content-Type: application/json" \
-d '{"stock_number":"12345","name":"Pro Batteries","Description":"Batteries","Price":"£2.99"}' \
 <http://localhost:8080/products/{stock_number>}

Get an existing product
curl -H "Content-Type: application/json" <http://localhost:8080/products/{stock_number>}

Consider the following:

1. Ensure your code is readable and maintainable, consider breaking the code into different functions <https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29>
2. Ensure that API Interface is easy for consumers to understand and HTTP codes are returned within the response are correct and reflective of the status of the response
3. Consider how you would store the product data, possibly use an in-memory database
4. Ensure you test your code through use of unit testing

## Part 2 - Live Coding

Add validation to check stock number is exactly 10 characters and contains only alphanumeric characters
