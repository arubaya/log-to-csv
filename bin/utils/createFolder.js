const fs = require('fs');

function createFolder(folderName) {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = createFolder;