const ps = require('prompt-sync');
const readBigFileAccess = require('./readBigFileAccess');
const sleep = require('./sleep');
const prompt = ps();

let totalLines = 0;

async function parsingLogToCSV(file, folderName, numberOfFile) {
  for (let index = 0; index < parseInt(numberOfFile); index++) {
    let lines = 0;
    const fileName = file + '.' + index;
    console.log('File: ' + fileName);
    console.log(`Inserting Data..`);
    await sleep(2000);
    lines = await readBigFileAccess(folderName + fileName, index).then((datas) => datas);
    totalLines = totalLines + lines;
    console.log();
    console.log('Done!');
    console.log('Total lines in file: ' + lines);
    console.log();
    await sleep(2000);
  }
}

function pad(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

async function insertAccessLogToDatabase(file, folderName, numberOfFile) {
  console.log(
    'If there is duplicate data in the table, it will be added\ny = insert\nn = cancel\n'
  );
  const answer = prompt('Are you sure you want to add big data?(y/n): ');

  if (answer === 'y') {
    let totalSeconds = 0;
    let seconds, minutes;
    let interval = setInterval(() => {
      ++totalSeconds;
      seconds = pad(totalSeconds % 60);
      minutes = pad(parseInt(totalSeconds / 60));
    }, 1000);
    await parsingLogToCSV(file, folderName, numberOfFile);
    clearInterval(interval);
    console.log();
    console.log('Done!');
    console.log('Total datas lines in folder: ' + totalLines);
    console.log(`${minutes} minutes ${seconds} seconds`);
    console.log();
  } else {
    console.log('Cancel insert data..');
    return;
  }
}

module.exports = insertAccessLogToDatabase;
