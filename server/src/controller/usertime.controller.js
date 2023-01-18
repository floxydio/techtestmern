const connect = require("../database/db");

async function getTimeStamp(req, res) {
  connect.init().then((db) => {
    const collection = db.collection("users");
    collection
      .find()
      .toArray()
      .then((data) => {
        const result = data.map((i) => {
          return {
            name: i.name,
            login_at: i.login_at,
            logout_at: i.logout_at,
            minute: Math.trunc((i.logout_at - i.login_at) / 1000 / 60),
          };
        });

        res.send({ result });
      });
  });
}

module.exports = { getTimeStamp };
