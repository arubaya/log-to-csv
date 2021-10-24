const db = require('./db_config');

function getAllData() {
  db.serialize(function(){

      let sql = `SELECT tanggal, ip, method, aux_method, status, url, browser, os FROM logs GROUP BY tanggal, ip, method, aux_method, status, url, browser, os
      `;
      db.all(sql, (err, rows) => {
          if (err) throw err;

          if(rows){
              // cetak isi rows
              rows.forEach(data => {
                  console.log(`${data.tanggal} | ${data.ip} | ${data.method} | ${data.aux_method} | ${data.status} | ${data.url} | ${data.browser} | ${data.os}`);
              });
          } else {
              console.log("tidak ada data/hasil");
          }
      });

  });

  db.close();
}

getAllData()

module.exports = getAllData;