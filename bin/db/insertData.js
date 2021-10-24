const db = require('./db_config');

function insertData(dataObject, index) {
    db.serialize(function(){
      const cols = Object.keys(dataObject).join(", ");
      const placeholders = Object.keys(dataObject).fill('?').join(", ");

      let sql = `INSERT INTO logs (${cols}) 
      VALUES (${placeholders})
      `;
      db.run(sql, Object.values(dataObject), (err) => {
          if(err) throw err;
          console.log(`${index} record inserted`);
      });
    });
}

module.exports = insertData;