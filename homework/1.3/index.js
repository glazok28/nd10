const filename = process.argv[1];
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const hash = crypto.createHash('md5');

const outfile = path.join(__dirname,'outfile.txt')

const output = fs.createWriteStream(outfile);

const input = fs.createReadStream(filename);
input.on('readable', () => {
  const data = input.read();
  if (data)
    //вычисляем хэш
     hash.update(data);
    //выводим в консоль 
  else { 
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});

// используем pipe для записи файла в outfile.txt'
input.pipe(output);

// вопрос - как тут вывести хэш в записывающий поток без трансформа ?


