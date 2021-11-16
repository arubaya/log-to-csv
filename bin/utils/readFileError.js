const fs = require("fs");
const es = require("event-stream");
const useragent = require("useragent");
const moment = require("moment");

// Readfile function
// Match and split log file line by line
function readFile(path) {
  return new Promise((resolve, reject) => {
    let datas = [];
    let readStream = fs
      .createReadStream(path)
      .pipe(es.split())
      .pipe(
        es
          .mapSync((line) => {
            readStream.pause();
            if (line !== "") {
              let data;
              const regex =
              /\[(?<tanggal>.+)\] \[(?<error_type>\S+)\] \[(?<pid_title>\S+) (?<pid>[0-9]+)\] \[(?<ip_title>\S+) (?<ip_client>\S+)\] (?<message>.+)/gm;
              let match = regex.exec(line);
              do {
                data = match && match.groups;
              } while ((match = regex.exec(line)) !== null);

              if (data !== null) {
                // data.date = new Date(moment(data.date, 'ddd MMM DD HH:mm:ss YYYY').format("YYYY-MM-DD"))
                data.tanggal = moment(data.tanggal, 'ddd MMM DD HH:mm:ss YYYY').format("YYYY-MM-DD")
                datas.push(data)
              }
            }

            readStream.resume();
          })
          .on("error", (err) => {
            console.log("Error:", err);
            reject(err);
          })
          .on("end", () => {
            console.log("Parse file finished.");
            resolve(datas);
          })
      );
  });
}

module.exports = readFile;
