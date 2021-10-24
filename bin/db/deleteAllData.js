const db = require("./db_config");

function deleteAllData() {
  db.serialize(function () {
    let sql = `DELETE FROM logs`;

    db.run(sql, (err) => {
      if (!err) console.log("All data deleted\n");
    });
  });

  db.close();
}

module.exports = deleteAllData;
