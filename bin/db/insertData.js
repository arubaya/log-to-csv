const db = require("./db_config");
// const sleep = require("../utils/sleep");

const sleep = () => {
  return new Promise((resolve) => resolve);
};

function insertData(dataObject, index) {
  return new Promise((resolve, reject) =>
    db.serialize(function () {
      const cols = Object.keys(dataObject).join(", ");
      const placeholders = Object.keys(dataObject).fill("?").join(", ");

      let sql = `INSERT INTO logs (${cols}) 
      VALUES (${placeholders})
      `;
      db.run(sql, Object.values(dataObject), (err) => {
        if (err) throw reject(err);
        resolve(console.log(`${index} record inserted`));
      });
    })
  );
}

module.exports = insertData;
