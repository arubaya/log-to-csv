#!/usr/bin/env node
const yargs = require("yargs");
const convertAllToCSV = require("./utils/convertAllToCSV");
const convertAllToCSV2 = require("./utils/convertAllToCSV_2");
const convertAllErrorToCSV = require("./utils/convertAllErrorToCSV");
const insertAccessLogToDatabase = require("./utils/insertAccessLogToDatabase");
const insertBigAccessLogToDatabase = require("./utils/insertBigAccessLogToDatabase");
const insertErrorLogToDatabase = require("./utils/insertErrorLogToDatabase");

// const createTable = require("./db/createTable");
// const deleteAllData = require("./db/deleteAllData");
// const getDataByDate = require("./db/getDataByDate");
// const getDailyAccessToCSV = require("./db/getDailyAccessToCSV");
// const getDailyAccessDetailToCSV = require("./db/getDailyAccessDetailToCSV");

// const logDataController = require('./controller/logData');

// CLI arguments with yargs package
const argv = yargs
  .usage(
    `
  ---Welcome to Log converter to CSV---

  Usage: $0 <command> [option] [argument]
  `
  )
  // .command("db", "Create database and create log table")
  // .command("get-all", "Get all data from database")
  .command("insert-access", "Insert access log file data to database", {
    resume: {
      alias: "r",
      describe: "Memulai insert data dari index yang sudah ditentukan",
      demandOption: true,
      type: "string",
      default: "1",
    },
    type: {
      alias: "t",
      describe: "Tipe ukuran file log",
      demandOption: true,
      type: "string",
      default: "small",
    },
    folder: {
      alias: "F",
      describe: "Folder path of all log file",
      demandOption: true,
      type: "string",
      default: "./data/",
    },
    file: {
      alias: "f",
      describe: "Log file name",
      demandOption: true,
      type: "string",
    },
    count: {
      alias: "c",
      describe: "Number of files in folder",
      demandOption: true,
      type: "string",
    },
  })
  .command("insert-error", "Insert error log file data to database", {
    folder: {
      alias: "F",
      describe: "Folder path of all log file",
      demandOption: true,
      type: "string",
      default: "./data/",
    },
    file: {
      alias: "f",
      describe: "Log file name",
      demandOption: true,
      type: "string",
    },
    count: {
      alias: "c",
      describe: "Number of files in folder",
      demandOption: true,
      type: "string",
    },
  })
  // .command("delete", "Delete data in log table")
  // .command("get-data", "Export data by date range to csv", {
  //   dateFrom: {
  //     alias: "d",
  //     describe: "Start date filter",
  //     demandOption: true,
  //     type: "string",
  //   },
  //   dateTo: {
  //     alias: "D",
  //     describe: "End date filter",
  //     demandOption: true,
  //     type: "string",
  //   },
  // })
  // .command("get-daily", "Export daily access data processing to csv ", {
  //   dateFrom: {
  //     alias: "d",
  //     describe: "Start date filter",
  //     demandOption: true,
  //     type: "string",
  //   },
  //   dateTo: {
  //     alias: "D",
  //     describe: "End date filter",
  //     demandOption: true,
  //     type: "string",
  //   },
  // })
  // .command(
  //   "get-daily-detail",
  //   "Export detail daily access data processing to csv ",
  //   {
  //     dateFrom: {
  //       alias: "d",
  //       describe: "Start date filter",
  //       demandOption: true,
  //       type: "string",
  //     },
  //     dateTo: {
  //       alias: "D",
  //       describe: "End date filter",
  //       demandOption: true,
  //       type: "string",
  //     },
  //   }
  // )
  .command("access-csv", "Convert all access log file in folder to CSV", {
    type: {
      alias: "t",
      describe: "Tipe ukuran file log",
      demandOption: true,
      type: "string",
      default: "small",
    },
    folder: {
      alias: "F",
      describe: "Folder path of all log file",
      demandOption: true,
      type: "string",
      default: "./data/",
    },
    file: {
      alias: "f",
      describe: "Log file name",
      demandOption: true,
      type: "string",
    },
    count: {
      alias: "c",
      describe: "Number of files in folder",
      demandOption: true,
      type: "string",
    },
  })
  .command("error-csv", "Convert all error log file in folder to CSV", {
    folder: {
      alias: "F",
      describe: "Folder path of all log file",
      demandOption: true,
      type: "string",
      default: "./data/",
    },
    file: {
      alias: "f",
      describe: "Log file name",
      demandOption: true,
      type: "string",
    },
    count: {
      alias: "c",
      describe: "Number of files in folder",
      demandOption: true,
      type: "string",
    },
  })
  .help("help")
  .alias("help", "h")
  .example([
    ["access-csv", '-t "big" --folder "./data/" --file "autosurat.access.log" -c "15"'],
    ["access-csv", '--folder "./data/" --file "autosurat.access.log" -c "15"'],
    ["error-csv", '--folder "./data/" --file "autosurat.error.log" -c "15"'],
    ["insert-access", '--folder "./data/" --file "autosurat.access.log" -c "15"'],
    // ["get-data", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
    // ["get-daily", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
    // ["get-daily-detail", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
  ]).argv;

// Main function
async function main() {
  const argvChoice = argv._[0];
  switch (argvChoice) {
    // case "db":
    //   createTable();
    //   break;

    case "insert-access":
      if (argv.type === 'small') {
        insertAccessLogToDatabase(argv.file, argv.folder, argv.count);
      } else {
        insertBigAccessLogToDatabase(argv.file, argv.folder, argv.count, parseInt(argv.resume));
      }
      break;
  
    case "insert-error":
      insertErrorLogToDatabase(argv.file, argv.folder, argv.count);
      break;

    // case "delete":
    //   deleteAllData();
    //   break;

    // case "get-data":
    //   getDataByDate(argv.dateFrom, argv.dateTo);
    //   break;

    // case "get-daily":
    //   getDailyAccessToCSV(argv.dateFrom, argv.dateTo);
    //   break;

    // case "get-daily-detail":
    //   getDailyAccessDetailToCSV(argv.dateFrom, argv.dateTo);
    //   break;

    case "access-csv":
      if (argv.type === 'small') {
        convertAllToCSV(argv.file, argv.folder, argv.count);
      } else {
        convertAllToCSV2(argv.file, argv.folder, argv.count);
      }
      break;

    case "error-csv":
      convertAllErrorToCSV(argv.file, argv.folder, argv.count);
      break;

    // case "get-all":
    //   logDataController.index();
    //   break;

    default:
      console.log(
        "\n---Welcome to Log converter to CSV---\nCLI that convert UIN Suka server log file to csv file. It uses custom templates as needed.\n\nfor more info run : node . -h\n"
      );
  }
}

main();
