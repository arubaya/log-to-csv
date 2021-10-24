const db = require('./db_config');
const ObjectsToCsv = require('objects-to-csv');

async function createCSV(dataArray) {
  // const folderName = options.folder + "csv";
  const folderName = './data/' + "csv";
  const fileName = 'Daily Access Detail Log'
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`${folderName}/${fileName}.csv`);
  console.log(`berhasil membuat file csv`)
}

function getDailyAccessDetailToCSV(dateFrom, dateTo) {
  let datas = [];
  let rowData;
  db.serialize(function(){

      let sql = `SELECT tanggal, ip, method, aux_method, status, url, browser, os, COUNT(*) AS jumlah FROM logs
        WHERE tanggal  
        GROUP BY tanggal, ip, method, aux_method, status, url, browser, os
      `;
      db.all(sql, async (err, rows) => {
          if (err) throw err;

          if(rows){
              // cetak isi rows
              await rows.forEach(data => {
                  // console.log(`${data.tanggal} | ${data.jumlah}`);
                  rowData = {
                    tanggal: data.tanggal,
                    ip: data.ip,
                    method: data.method,
                    aux_method: data.aux_method,
                    status: data.status,
                    url: data.url,
                    browser: data.browser,
                    os: data.os,
                    jumlah: data.jumlah,
                  }
                  datas.push(rowData)
              });
              createCSV(datas);
          } else {
              console.log("tidak ada data/hasil");
          }
      });

  });

  db.close();
}

getDailyAccessDetailToCSV()

module.exports = getDailyAccessDetailToCSV;