const db = require('./db_config');

function getDailyAccess() {
  db.serialize(function(){

      let sql = `SELECT tanggal, COUNT(*) AS jumlah FROM logs
        WHERE tanggal  
        GROUP BY tanggal
      `;
      db.all(sql, (err, rows) => {
          if (err) throw err;

          if(rows){
              // cetak isi rows
              rows.forEach(data => {
                  console.log(`${data.tanggal} | ${data.jumlah}`);
              });
          } else {
              console.log("tidak ada data/hasil");
          }
      });

  });

  db.close();
}

getDailyAccess()

module.exports = getDailyAccess;