#!/usr/bin/env node
const yargs = require("yargs");
const readFile = require('./utils/readFile');
const convertAllToCSV = require('./utils/convertAllToCSV');
const insertLogToDatabase = require('./utils/insertLogToDatabase');

const createTable = require('./db/createTable');
// const getAllData = require('./db/getAllData');


// CLI arguments with yargs package
const argv = yargs
  .usage(`
  ---Welcome to Log converter to CSV---

  Usage: $0 <command> [option] [argument]
  `)
  .command('db', 'Create database and create log table')
  .command('insert', 'Insert log file data to database', {
    folder: {
      alias: 'F',
      describe: 'Folder path of all log file',
      demandOption: true,
      type: 'string',
      default: './data/',
    },
    file: {
      alias: 'f',
      describe: 'Log file name',
      demandOption: true,
      type: 'string',
    },
    count: {
      alias: 'c',
      describe: 'Number of files in folder',
      demandOption: true,
      type: 'string',
    }
  })
  .command('create-csv', 'Convert all log file in folder to CSV', {
    folder: {
      alias: 'F',
      describe: 'Folder path of all log file',
      demandOption: true,
      type: 'string',
      default: './data/',
    },
    file: {
      alias: 'f',
      describe: 'Log file name',
      demandOption: true,
      type: 'string',
    },
    count: {
      alias: 'c',
      describe: 'Number of files in folder',
      demandOption: true,
      type: 'string',
    }
  })
  .help('help')
  .alias('help', 'h')
  .example([
    ['create-csv', '-F "./data/" -f "autosurat.access.log" -c "52"'],
    ['insert', '-F "./data/" -f "autosurat.access.log" -c "52"']
    ])
  .argv;

// Sleep function
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Main function
async function main() {
  const argvChoice = argv._[0];
  switch(argvChoice) {
    case 'db':
      createTable();
      break;
    
    case 'insert':
      insertLogToDatabase(argv.file, argv.folder, argv.count);
      break;
    
    case 'create-csv':
      convertAllToCSV(argv.file, argv.folder, argv.count)
      break;
  }
}

main();

// let docPath = argv.folder + "/";
    // let numberOfFile = argv.number;
    // // createCSVFolder()
    // // createTable();

    // for (let index = 1; index <= parseInt(numberOfFile); index++) {
    //     const fileName = argv.file + "." + index;
    //     console.log('File: ' + fileName);
    //     let datas = await readFile(docPath + fileName).then(datas => datas);
    //     console.log(datas.length)
    //     console.log('Finish parsing. Total chunks: ' + datas.length);
    //     let lines = 0;
    //     datas.forEach(data => {
    //         lines = lines + data.length;
    //     })
    //     console.log('Total lines: ' + lines)
    //     console.log(`Inserting Data..`)
    //     await sleep(1000);
    //     // for (let i = 0; i < lines; i++) {
    //     //   // console.log(`Inserting Data: ${i+1}`)
    //     //   // console.log(datas[0][i]);
    //     //   insertData(datas[0][i], i+1);
    //     // }
    //     await sleep(200)
    //     console.log('Finish!')
    //     console.log()
    // }