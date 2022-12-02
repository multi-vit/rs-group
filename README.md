# rs-group

Completed coding test for RS Group Associate Software Engineer role.

## Learning

- I have never used an in-memory datastore - I went with mongodb-memory-server as I am familiar with MongoDB syntax, but I would like to explore other solutions like redis in future.
- How to run curl commands in Postman - My laptop runs on Windows so these commands aren't native. I learnt how to mock the required calls in Postman.
- Testing MongoDB with Jest - with school of code, we only ever tested via routes in the server, so I learnt about testing MongoDB directly with Jest.
- Status Codes - I made an effort to return the correct status code based on the response
- Checking for Content-Type of application/json

## Installation

To install this repository on your local machine, fork or clone the repository from GitHub. To do this, you can run:

```
git clone https://github.com/multi-vit/rs-group.git
```

Or to fork, you can press the 'fork' button on this page, and follow the on-screen instructions.

Once you have access to this repository on your local machine, change directory into the right folder:

```
cd rs-group
```

Once you are inside this directory, run:

```
npm i
```

This will install all the necessary dependencies.

This project uses ES6 import and export syntax.

## Scripts and Commands

To run this project locally (leveraging port 8080 on localhost), run:

```
npm start
```

You can also use the nodemon script for extra monitoring and automatic restart of server on change:

```
npm run dev
```

To run the testing suites, run:

```
npm test
```

### Routes and Data Structure

The server has 3 types of request available: POST, PUT and GET.

It expects you to make POST and GET (all products) requests to /products. For PUT and GET by stock_number requests, include the stock number in the path like so: /products/{stock_number}

There is a helper script in utils that will validate any product being passed for POST/PUT requests and the server will return an error if the product data does not meet the expected conditions. Your product should look like this:

{"stock_number":"12345","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}

As this server only uses an in-memory database, your data will not persist when the server stops running or is restarted.
