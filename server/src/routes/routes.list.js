const cors = require("cors");
const bodyParser = require("body-parser");
const authController = require("../controller/auth.controller");

function SetupRoutes(app) {
  // Middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Endpoint
  app.get("/", (req, res) => res.send("Homepage"));

  app.post("/api/register", authController.signUpAccount);
  app.post("/api/login", authController.signInAccount);
}

module.exports = { SetupRoutes };
