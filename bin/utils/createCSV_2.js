const ObjectsToCsv = require('objects-to-csv');

async function createCSV(index, dataArray, file, chunk) {
  const fileName = file + "-" + index + "_" + chunk;
  console.log(`converting: ${fileName}.csv`)
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`result/csv/${fileName}.csv`);
}

module.exports = createCSV;