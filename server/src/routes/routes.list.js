const cors = require("cors");
const bodyParser = require("body-parser");
const authController = require("../controller/auth.controller");
const usertimeController = require("../controller/usertime.controller");
const express = require("express");
function SetupRoutes(app) {
  // Middleware
  app.use(cors());
  // app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Endpoint
  app.get("/", (req, res) => res.send("Homepage"));

  app.post("/api/register", authController.signUpAccount);
  app.post("/api/login", authController.signInAccount);
  app.post("/api/logout", authController.logoutAccount);
  app.get("/api/timestamp-user", usertimeController.getTimeStamp);
}

module.exports = { SetupRoutes };
