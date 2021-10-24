const db = require('./db_config');
const ObjectsToCsv = require('objects-to-csv');

async function createCSV(dataArray) {
  // const folderName = options.folder + "csv";
  const folderName = './data/' + "csv";
  const fileName = 'Daily Access Log'
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`${folderName}/${fileName}.csv`);
  console.log(`berhasil membuat file csv`)
}

function getDailyAccessToCSV(dateFrom, dateTo) {
  let datas = [];
  let rowData;
  db.serialize(function(){

      let sql = `SELECT tanggal, COUNT(*) AS jumlah FROM logs
        WHERE tanggal  
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
              createCSV(datas);
          } else {
              console.log("tidak ada data/hasil");
          }
      });

  });

  db.close();
}

getDailyAccessToCSV()

module.exports = getDailyAccessToCSV;