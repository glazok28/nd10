const fs = require('fs');

const opts = { encoding: 'utf8'};

const path = './hello/'

function showIt (err, info) {
  if (err) return console.error(err);
  console.log(info.type);
};


function showInfo(err, info) {

if (err) throw err;

switch (info.type) {

case 'file':
console.log(`${info.path} — является файлом, содержимое:`);
console.log(info.content);
console.log('-'.repeat(10));
break;
case 'directory':
console.log(`${info.path} — является папкой, список файлов и папок в ней:`);
info.childs.forEach(name => console.log(` ${name}`));
console.log('-'.repeat(10));
break;
default:

console.log('Данный тип узла не поддерживается'); break;
}
}



function pathInfo(path, callback) {

  fs.stat(path, (err, info) => {

    if (err) throw err;

    if (info.isFile()) {
      info.path = path;
      info.type = 'file';
      info.content = fs.readFileSync(path, opts);
      info.childs = undefined;
      //console.log('object is file');
    }

    if (info.isDirectory()) {
      info.path = path;
      info.type = 'directory';
      info.content = undefined;
      info.childs = fs.readdirSync(path, opts);
      // console.log('object is directory');
    }

    callback(err, info);

  });

};

// pathInfo(__dirname, showInfo);
// pathInfo(__filename, showInfo);

module.exports = pathInfo;




