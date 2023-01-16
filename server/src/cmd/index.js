const express = require("express");
const app = express();
const port = 9000;
const initMongoDB = require("../database/db");
const routes = require("../routes/routes.list");

routes.SetupRoutes(app);

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
 