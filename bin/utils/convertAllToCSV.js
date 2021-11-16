const readFile = require('./readFile');
const createFolder = require('./createFolder');
const createCSV = require('./createCSV');
const sleep = require('./sleep');

async function convertAllToCSV(file, folderName, numberOfFile) {
  createFolder(`./result/csv`);
  for (let index = 0; index < parseInt(numberOfFile); index++) {
      const fileName = file + "." + index;
      console.log('File: ' + fileName);
      let datas = await readFile(folderName + fileName).then(datas => datas);
      console.log('Finish parsing. Total chunks: ' + datas.length);
      let lines = 0;
      datas.forEach(data => {
          lines = lines + data.length;
      })
      console.log('Total lines: ' + lines)
      for (let i = 0; i < datas.length; i++) {
        createCSV(index, datas[i], folderName, file, i+1);
      }
      console.log()
  }
  await sleep(1000)
  console.log('Done!')
  console.log()
}

module.exports = convertAllToCSV;