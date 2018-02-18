const fs = require('fs');
const path = require('path');
const conf = { encoding: 'utf8' };

function readDirectoryListing(dirPath){
  return new Promise((resolve, reject) => {
        let dir = path.join(__dirname, dirPath);
        // let file = {
        //     name: undefined,
        //     content: undefined
        // }

        fs.readdir(dir, conf, (err, files) => {
            if(err) {
               reject(err);
            } else {
               resolve(files)
            }
        });
}

)

};

  function readFile(filePath){
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, conf, (err, file) => {
        if(err) {
          reject(err);
        } else {
          resolve({content: file, name: filePath})
        }
      }
      )
    })
  };


function readAll(dirPath) {
    return readDirectoryListing(dirPath)
    .then((files) => {
      // тут заменить return [] на обработку files через Promise.all + Array.map
      // пример https://repl.it/@alQlagin/Promiseall-Arraymap
      return  Promise.all (files.map(fileName => readFile(dirPath+fileName) ))
    })
}



module.exports = {readAll};