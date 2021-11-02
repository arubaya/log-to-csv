const ps = require("prompt-sync");
const readFile = require("./readFile");
const insertData = require("../db/insertData");
const deleteAllData = require("../db/deleteAllData");
const sleep = require("./sleep");
const prompt = ps();

let datas;
let lines = 0;
let linesCount = 1;

async function parsingLogToCSV(file, folderName, numberOfFile) {
  for (let index = 1; index <= parseInt(numberOfFile); index++) {
    const fileName = file + "." + index;
    console.log("File: " + fileName);
    datas = await readFile(folderName + fileName).then((datas) => datas);
    console.log("Finish parsing. Total chunks: " + datas.length);
    datas.forEach((data) => {
      lines = lines + data.length;
    });
    console.log("Total lines in file: " + lines);
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

async function insertLogToDatabase(file, folderName, numberOfFile) {
  console.log(
    "If there is duplicate data in the table, it will be added\ny = insert\nn = delete data\n"
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
      for (let i = 0; i < datas.length; i++) {
        for (let j = 0; j < datas[i].length; j++) {
          await insertData(datas[i][j], linesCount);
          linesCount++;
        }
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
    deleteAllData();
  }
}

module.exports = insertLogToDatabase;
