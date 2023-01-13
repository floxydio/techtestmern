const { MongoClient } = require("mongodb");
const dotEnv = require("dotenv");

dotEnv.config();
const dbName = "testmern";
const urlLink = `${process.env.DB_MONGO}`;

const client = new MongoClient(urlLink);

async function init() {
  await client.connect();
  const db = client.db(dbName);
  return db;
}

module.exports = { init };
