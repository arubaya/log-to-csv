const db = require('./db_config');
const ObjectsToCsv = require('objects-to-csv');

async function createCSV(dataArray, dateFrom, dateTo) {
  const fileName = 'DAILY_ACCESS_LOG'
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`result/data-processing/${fileName}(${dateFrom} - ${dateTo}).csv`);
  console.log(`berhasil membuat file csv`)
}

function getDailyAccessToCSV(dateFrom, dateTo) {
  let datas = [];
  let rowData;
  db.serialize(function(){

      let sql = `SELECT tanggal, COUNT(*) AS jumlah FROM logs
        WHERE tanggal BETWEEN '${dateFrom}' AND '${dateTo}'
        GROUP BY tanggal
      `;
      db.all(sql, async (err, rows) => {
          if (err) throw err;

          if(rows){
              // cetak isi rows
              await rows.forEach(data => {
                  rowData = {
                    tanggal: data.tanggal,
                    jumlah: data.jumlah,
                  }
                  datas.push(rowData)
              });
              createCSV(datas, dateFrom, dateTo);
          } else {
              console.log("tidak ada data/hasil");
          }
      });

  });

  db.close();
}

module.exports = getDailyAccessToCSV;