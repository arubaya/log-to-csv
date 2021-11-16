const fs = require("fs");
const es = require("event-stream");
const useragent = require("useragent");
const moment = require("moment");
const accessLogController = require('../controller/accessLog');

// Readfile function
// Match and split log file line by line
function readFile(path, indexFile) {
  return new Promise((resolve, reject) => {
    let datas = [];
    let index = 0;
    let readStream = fs
      .createReadStream(path)
      .pipe(es.split())
      .pipe(
        es
          .mapSync(async (line) => {
            readStream.pause();
            if (line !== "") {
              let data;
              const regex =
                /(?<ip>\S+) (?<undefined>\S+) (?<undefined2>\S+) \[(?<timestamp>.+)\] (?<method>\S+) (?<path>\S+) (?<auxMethod>\S+) (?<statusCode>[0-9]+) (?<contentSize>\S+) (?<url>\S+) (?<userAgent>.*)/gm;
              let match = regex.exec(line);
              do {
                data = match && match.groups;
              } while ((match = regex.exec(line)) !== null);

              if (data !== null) {
                const agent = useragent.parse(data.userAgent);
                const datetime = moment(
                  new Date(data.timestamp.replace(":", " "))
                );
                data = {
                  ip: data.ip,
                  tanggal: datetime.format("YYYY-MM-DD"),
                  waktu: datetime.format("hh:mm:ss"),
                  method: data.method,
                  aux_method: data.auxMethod,
                  status: data.statusCode,
                  url: data.url,
                  browser: agent.toAgent(),
                  os: agent.os.toString(),
                };

                index++;
                await accessLogController.storeData(data, index, indexFile);
                
              }
            }

            readStream.resume();
          })
          .on("error", (err) => {
            console.log("Error:", err);
            reject(err);
          })
          .on("end", () => {
            console.log("Insert file finished.");
            resolve(index);
          })
      );
  });
}

module.exports = readFile;