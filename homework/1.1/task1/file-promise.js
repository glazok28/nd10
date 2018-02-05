
const fs = require('fs');

const opts = { encoding: 'utf8'};

function read(filename) {
  return new Promise((done, fail) => {
    fs.readFile(filename, opts, (err, data) => {
      if (err) {
        fail(err);
      } else {
        done(data);
      }
    })
  })
};

function write(filename, data) {
  return new Promise((done, fail) => {
    fs.writeFile(filename, data, opts, err => {
      if (err) {
        fail(err);
      } else {
        done(filename);
      }
    })
  })
};

module.exports = {read, write};