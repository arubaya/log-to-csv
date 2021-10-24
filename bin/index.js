#!/usr/bin/env node
const yargs = require("yargs");
const convertAllToCSV = require("./utils/convertAllToCSV");
const insertLogToDatabase = require("./utils/insertLogToDatabase");

const createTable = require("./db/createTable");
const deleteAllData = require("./db/deleteAllData");
const getDataByDate = require("./db/getDataByDate");
const getDailyAccessToCSV = require("./db/getDailyAccessToCSV");
const getDailyAccessDetailToCSV = require("./db/getDailyAccessDetailToCSV");

// CLI arguments with yargs package
const argv = yargs
  .usage(
    `
  ---Welcome to Log converter to CSV---

  Usage: $0 <command> [option] [argument]
  `
  )
  .command("db", "Create database and create log table")
  .command("insert", "Insert log file data to database", {
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
  .command("delete", "Delete data in log table")
  .command("get-data", "Export data by date range to csv", {
    dateFrom: {
      alias: "d",
      describe: "Start date filter",
      demandOption: true,
      type: "string",
    },
    dateTo: {
      alias: "D",
      describe: "End date filter",
      demandOption: true,
      type: "string",
    },
  })
  .command("get-daily", "Export daily access data processing to csv ", {
    dateFrom: {
      alias: "d",
      describe: "Start date filter",
      demandOption: true,
      type: "string",
    },
    dateTo: {
      alias: "D",
      describe: "End date filter",
      demandOption: true,
      type: "string",
    },
  })
  .command(
    "get-daily-detail",
    "Export detail daily access data processing to csv ",
    {
      dateFrom: {
        alias: "d",
        describe: "Start date filter",
        demandOption: true,
        type: "string",
      },
      dateTo: {
        alias: "D",
        describe: "End date filter",
        demandOption: true,
        type: "string",
      },
    }
  )
  .command("create-csv", "Convert all log file in folder to CSV", {
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
    ["create-csv", '-F "./data/" -f "autosurat.access.log" -c "52"'],
    ["insert", '-F "./data/" -f "autosurat.access.log" -c "52"'],
    ["get-data", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
    ["get-daily", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
    ["get-daily-detail", '--dateFrom "06-10-2021" --dateTo "10-10-2021"'],
  ]).argv;

// Main function
async function main() {
  const argvChoice = argv._[0];
  switch (argvChoice) {
    case "db":
      createTable();
      break;

    case "insert":
      insertLogToDatabase(argv.file, argv.folder, argv.count);
      break;

    case "delete":
      deleteAllData();
      break;

    case "get-data":
      getDataByDate(argv.dateFrom, argv.dateTo);
      break;

    case "get-daily":
      getDailyAccessToCSV(argv.dateFrom, argv.dateTo);
      break;

    case "get-daily-detail":
      getDailyAccessDetailToCSV(argv.dateFrom, argv.dateTo);
      break;

    case "create-csv":
      convertAllToCSV(argv.file, argv.folder, argv.count);
      break;

    default:
      console.log(
        "\n---Welcome to Log converter to CSV---\nCLI that convert UIN Suka server log file to csv file. It uses custom templates as needed.\n\nfor more info run : node . -h\n"
      );
  }
}

main();
