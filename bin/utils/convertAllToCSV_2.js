const readFile = require('./readFile_2');
const createFolder = require('./createFolder');
const sleep = require('./sleep');

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

async function convertAllToCSV(file, folderName, numberOfFile) {
  createFolder(`./result/csv`);
  for (let index = 0; index < parseInt(numberOfFile); index++) {
      const fileName = file + "." + index;
      console.log('File: ' + fileName);
      console.log('Convert to csv... ');
      await sleep(500);
      let totalSeconds = 0;
      let seconds, minutes;
      let interval = setInterval(() => {
        ++totalSeconds;
        seconds = pad(totalSeconds % 60);
        minutes = pad(parseInt(totalSeconds / 60));
      }, 1000);
      await readFile(folderName + fileName, file, index).then(datas =>datas);
      // console.log('Finish parsing. Total chunks: ' + datas.length);
      // let lines = 0;
      // datas.forEach(data => {
      //     lines = lines + data.length;
      // })
      // console.log('Total lines: ' + lines)
      // for (let i = 0; i < datas.length; i++) {
      //   createCSV(index, datas[i], folderName, file, i+1);
      // }
      console.log()
      await sleep(1000)
      clearInterval(interval);
      console.log('Done!')
      console.log(`${minutes} minutes ${seconds} seconds`)
      console.log()
  }
}

module.exports = convertAllToCSV;