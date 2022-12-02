import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

// This will create an new instance of "MongoMemoryServer" and automatically start it
const mongod = await MongoMemoryServer.create();

const uri = mongod.getUri();
export const client = new MongoClient(uri);
export const db = client.db("productsdb");
export const products = db.collection("products");
