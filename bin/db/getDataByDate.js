const db = require("./db_config");
const ObjectsToCsv = require("objects-to-csv");

async function createCSV(dataArray, dateFrom, dateTo, chunk) {
  const fileName = "LOG";
  const csv = new ObjectsToCsv(dataArray);

  // Save to file:
  await csv.toDisk(
    `result/data-processing/${fileName}(${dateFrom} - ${dateTo})_${chunk}.csv`
  );
  console.log(`berhasil membuat file csv`);
}

function getDataByDate(dateFrom, dateTo) {
  let datas = [[]];
  let rowData;
  let index = 0;
  db.serialize(function () {
    let sql = `SELECT tanggal, ip, method, aux_method, status, url, browser, os FROM logs
        WHERE tanggal BETWEEN '${dateFrom}' AND '${dateTo}'
      `;
    db.all(sql, async (err, rows) => {
      if (err) throw err;

      if (rows) {
        // cetak isi rows
        await rows.forEach((data) => {
          rowData = {
            tanggal: data.tanggal,
            ip: data.ip,
            method: data.method,
            aux_method: data.aux_method,
            status: data.status,
            url: data.url,
            browser: data.browser,
            os: data.os,
          };
          index++;
          if (index % 100000 == 0) {
            datas.push([]);
          }
          datas[datas.length - 1].push(rowData);
        });
        for (let i = 0; i < datas.length; i++) {
          createCSV(datas[i], dateFrom, dateTo, i+1);
        }
      } else {
        console.log("tidak ada data/hasil");
      }
    });
  });

  db.close();
}

module.exports = getDataByDate;
