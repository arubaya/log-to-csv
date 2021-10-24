const ObjectsToCsv = require('objects-to-csv');

async function createCSV(index, dataArray, folder, file) {
  const folderName = folder + "csv";
  const fileName = file + "-" + index;
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`result/csv/${fileName}.csv`);
}

module.exports = createCSV;