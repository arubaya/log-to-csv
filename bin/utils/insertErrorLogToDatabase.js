const ps = require("prompt-sync");
const readFileError = require("./readFileError");
const sleep = require("./sleep");
const prompt = ps();

const errorLogController = require('../controller/errorLog');

let lineDatas = [];
let lines = 0;

async function parsingLogToCSV(file, folderName, numberOfFile) {
  for (let index = 0; index < parseInt(numberOfFile); index++) {
    const fileName = file + "." + index;
    console.log("File: " + fileName);
    datas = await readFileError(folderName + fileName).then((datas) => datas);
    console.log("Total lines in file: " + datas.length);
    lines = lines + datas.length;
    console.log("Total lines data: " + lines);
    for (let i = 0; i < datas.length; i++) {
      lineDatas.push(datas[i]);
    }
    await sleep(1000);
    console.log("Done!");
    console.log();
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

async function insertAccessLogToDatabase(file, folderName, numberOfFile) {
  console.log(
    "If there is duplicate data in the table, it will be added\ny = insert\nn = cancel\n"
  );
  const answer = prompt("Are you sure you want to add data?(y/n): ");

  if (answer === "y") {
    await parsingLogToCSV(file, folderName, numberOfFile);

    console.log("Total lines data: " + lines);
    const insertAnswer = prompt("Are you sure you want to insert data?(y/n): ");

    if (insertAnswer === "y") {
      console.log(`Inserting Data..`);
      await sleep(1000);
      let totalSeconds = 0;
      let seconds, minutes;
      let interval = setInterval(() => {
        ++totalSeconds;
        seconds = pad(totalSeconds % 60);
        minutes = pad(parseInt(totalSeconds / 60));
      }, 1000);
      for (let i = 0; i < lineDatas.length; i++) {
        await errorLogController.storeData(lineDatas[i], i + 1);
      }
      clearInterval(interval);
      console.log();
      console.log('Done!')
      console.log("Total lines data: " + lineDatas.length + ' have been successfully inserted');
      console.log(`${minutes} minutes ${seconds} seconds`)
    } else {
      console.log("Aborting insert data..");
      return;
    }
  } else {
    console.log("Cancel insert data..");
    return;
  }
}

module.exports = insertAccessLogToDatabase;
