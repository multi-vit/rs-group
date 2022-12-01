import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

// This will create an new instance of "MongoMemoryServer" and automatically start it
const mongod = await MongoMemoryServer.create();

const uri = mongod.getUri();
const client = new MongoClient(uri);
const db = client.db("productsdb");
const products = db.collection("products");

export default products;
