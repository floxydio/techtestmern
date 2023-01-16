const connect = require("../database/db");
const bcrypt = require("bcrypt");

async function signUpAccount(req, res) {
  const { name, username, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  connect.init().then((db) => {
    const collection = db.collection("users");
    collection
      .insertOne({
        name: name,
        username: username,
        password: hash,
        timestamp: "",
        registeredAt: new Date(),
      })
      .then(() => {
        res.status(201).send({
          message: "Successfully Register",
        });
      });
  });
}

async function signInAccount(req, res) {
  const { username, password } = req.body;
  connect.init().then((db) => {
    const collection = db.collection("users");
    collection.findOne({ username: username }).then((data) => {
      const checkBcrypt = bcrypt.compareSync(password, data.password);
      if (checkBcrypt) {
        collection.updateOne(
          { _id: data._id },
          { $set: { timestamp: new Date() } }
        );
        res.status(201).send({
          status: 201,
          data: {
            _id: data._id,
            name: data.name,
            username: data.username,
          },
          message: "Successfully Login",
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Username or Password is Incorrect",
        });
      }
    });
  });
}

module.exports = { signUpAccount, signInAccount };
