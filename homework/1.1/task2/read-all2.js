const fs = require('fs');
const path = require('path');
const conf = { encoding: 'utf8' };

function readDirectoryListing(dirPath){
  return new Promise((resolve, reject) => {
        let dir = path.join(__dirname, dirPath);
        let file = {
            name: undefined,
            content: undefined
        }

        fs.readdir(dir, conf, (err, files) => {
            if(err) {
              return reject(err);
            } else {
              return resolve(files)
            }
        })
  });
}

function readAll(dirPath) {
    return readDirectoryListing(dirPath)
    .then((files) => {
      // тут заменить return [] на обработку files через Promise.all + Array.map
      // пример https://repl.it/@alQlagin/Promiseall-Arraymap
      Promise.all (files.map(file => file + 'adada'))
    })
}

module.exports = {readAll};