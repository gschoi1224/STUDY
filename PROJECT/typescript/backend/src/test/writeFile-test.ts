import * as path from 'path';
import { writeFile } from '../fileApi/writeFile';
import { mkdir } from '../fileApi/mkdir';
import mkdirp = require('mkdirp');

const writeTest = async (filename: string, data: any) => {
    const result = await writeFile(filename, data);
    console.log(`write ${result} to ${filename}`);
};

mkdir('./data')
    .then(s => writeTest('./data/hello.txt', 'hello world'))
    .then(s =>
        writeTest(
            './data/test.json',
            JSON.stringify({ name: 'Leonardo', age: 55 }, null, 2), // 사람이 읽기 편한 형태의 JSON 문자열 만들어줌
        ),
    )
    .catch((e: Error) => console.log(e.message));
