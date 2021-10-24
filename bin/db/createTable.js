const db = require('./db_config');
const sleep = require('../utils/sleep');

function createTable() {
  db.serialize(function(){

      let sql = `CREATE TABLE IF NOT EXISTS logs(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ip TEXT,
          tanggal TEXT,
          waktu TEXT, 
          method TEXT, 
          aux_method TEXT, 
          status TEXT, 
          url TEXT, 
          browser TEXT, 
          os TEXT 
      );`;
      db.run(sql, (err) => {
          if(err) throw err;
          console.log("Table created");
      });

  });
  sleep(1000);
  db.close();
}

module.exports = createTable;