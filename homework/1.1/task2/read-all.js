const fs = require('fs');

const path = require('path');

const opts = { encoding: 'utf8'};


function readFileSync (filename, addpath) {
  const filepath = path.join(addpath, filename);
  return fs.readFileSync(filepath, opts)
};


function readAll(dirname) {
  return new Promise((done, fail) => {
    fs.readdir(dirname, opts, (err, filenames) => {

      if (err) {
        fail(err);
      } else {

        let outObj = {};
        let outArr = [];

        for (let i=0; i<filenames.length; i++) {
          outObj.name = filenames[i];
          outObj.content = readFileSync(filenames[i], dirname);
          outArr.push(outObj);
          outObj = {};
        }

        done(outArr);
      }

    })
  })
};

//readAll('./logs')
//  .then (result => console.log(result));

module.exports = readAll;