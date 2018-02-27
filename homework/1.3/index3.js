const stream = require ("stream");
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const filename = process.argv[1];

const input = fs.createReadStream(filename);

const outfile = path.join(__dirname,'outfile.txt');

const output = fs.createWriteStream(outfile);

class md5Transform extends stream.Transform {
  constructor (options) {
    super(options);

    this.digester = crypto.createHash('md5');
  };

  // during each chunk, update the digest
  _transform (chunk, enc, cb) {
  // if is Buffer use it, otherwise coerce
  let buffer = (Buffer.isBuffer(chunk)) ?
    chunk :
    new Buffer(chunk, enc);
  this.digester.update(buffer); // update hash
  // we are not writing anything out at this
  // time, only at end during _flush
  // so we don't need to call push
  cb();
  };

  // at the end, output the hex digest
  _flush (cb) {
    this.push(this.digester.digest('hex'));
    cb();
  };
};

const Md5Sum = new md5Transform;
input.pipe(Md5Sum).pipe(process.stdout); // output to stdout
input.pipe(Md5Sum).pipe(output);
Md5Sum.end();  // finish