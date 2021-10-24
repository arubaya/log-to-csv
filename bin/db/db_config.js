const sqlite3 = require('sqlite3').verbose();
const createFolder = require('../utils/createFolder');

const dbFile = './result/db/log_database.db';

createFolder(`./result`);
createFolder(`./result/db`);

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err) throw err;
    console.log("Successfully connected to database!");
});

module.exports = db;