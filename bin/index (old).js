#!/usr/bin/env node
const fs = require('fs')
const es = require('event-stream')
const useragent = require('useragent')
const moment = require('moment')
const yargs = require("yargs");
const ObjectsToCsv = require('objects-to-csv');

// Option usage for yargs package
const options = yargs
 .usage(`---Welcome to Log converter to CSV---
 Usage: -f <folderPath> -n <numberOfFiles>
 
 Example: -F "./data/" -f "autosurat.access.log" -n "52"`)
 .option("F", { alias: "folder", describe: "Folder path", type: "string", demandOption: true })
 .option("f", { alias: "file", describe: "log file name", type: "string", demandOption: true })
 .option("n", { alias: "number", describe: "Number of files", type: "string", demandOption: true })
 .argv;

// Readfile function
// Match and split log file line by line
function readFile(path) {
    return new Promise((resolve, reject) => {
        let datas = [[]]
        let index = 0
        let readStream = fs.createReadStream(path)
            .pipe(es.split())
            .pipe(es.mapSync((line) => {
                readStream.pause()
                if (line !== '') {
                    let data
                    const regex = /(?<ip>\S+) (?<undefined>\S+) (?<undefined2>\S+) \[(?<timestamp>.+)\] (?<method>\S+) (?<path>\S+) (?<auxMethod>\S+) (?<statusCode>[0-9]+) (?<contentSize>\S+) (?<url>\S+) (?<userAgent>.*)/gm
                    let match = regex.exec(line)
                    do {
                        data = match && match.groups
                    } while ((match = regex.exec(line)) !== null)

                    const agent = useragent.parse(data.userAgent);
                    const datetime = moment(new Date(data.timestamp.replace(':', ' ')))
                    data = {
                        ip: data.ip,
                        tanggal: datetime.format('DD-MM-YYYY'),
                        waktu: datetime.format('hh:mm:ss'),
                        method: data.method,
                        aux_method: data.auxMethod,
                        status: data.statusCode,
                        url: data.url,
                        browser: agent.toAgent(),
                        os: agent.os.toString()
                    }

                    index++
                    if (index % 100000 == 0) {
                        datas.push([])
                    }
                    datas[datas.length - 1].push(data)
                }

                readStream.resume()
            })
                .on('error', (err) => {
                    console.log('Error:', err)
                    reject(err)
                })
                .on('end', () => {
                    console.log('Read file finished.')
                    resolve(datas)
                }))
    })
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function createCSVFolder() {
  const folderName = options.folder + "csv";
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error(err)
  }
}

async function createCSV(index, dataArray) {
  const folderName = options.folder + "csv";
  const fileName = options.file + "-" + index;
  const csv = new ObjectsToCsv(dataArray);
 
  // Save to file:
  await csv.toDisk(`${folderName}/${fileName}.csv`);
}

async function main() {
    let docPath = options.folder + "/";
    let numberOfFile = options.number;
    createCSVFolder()

    for (let index = 1; index <= parseInt(numberOfFile); index++) {
        const fileName = options.file + "." + index;
        console.log('File: ' + fileName);
        let datas = await readFile(docPath + fileName).then(datas => datas);
        console.log('Finish parsing. Total chunks: ' + datas.length);
        let lines = 0;
        datas.forEach(data => {
            lines = lines + data.length;
        })
        console.log('Total lines: ' + lines)
        for (let i = 0; i < datas.length; i++) {
          console.log(`Converting chunk to CSV: ${i+1}`)
          createCSV(index, datas[i])
          await sleep(1000)
        }
        console.log('Finish!')
        console.log()
        // await sleep(2000)
    }
}

main()