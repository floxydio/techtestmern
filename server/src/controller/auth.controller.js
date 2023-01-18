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
        login_at: "",
        registeredAt: new Date(),
        logout_at: "",
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
          { $set: { login_at: new Date() } }
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

async function logoutAccount(req, res) {
  connect.init().then((db) => {
    const collection = db.collection("users");
    collection.findOne({ username: req.body.username }).then((data) => {
      console.log(data);
      collection
        .updateOne(
          { _id: data._id },
          {
            $set: {
              logout_at: new Date(),
            },
          }
        )
        .then((data) => {
          return res.status(200).send({
            message: "Successfully Logout",
          });
        });
    });
  });
}

module.exports = { signUpAccount, signInAccount, logoutAccount };
