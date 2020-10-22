// 파일을 읽은 후 gzip 방식으로 압축
const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writestream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writestream); // 버퍼 데이터가 전달되다가 gzip 압축을 거친 후 파일로 써짐