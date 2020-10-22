// 파이핑 : createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStrema으로 파일을 쓰는 것
const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);