import { readFile } from 'fs';

const readFilePromise = (filename: string): Promise<string> =>
    new Promise<string>(
        (resolve: (value: string) => void, reject: (error: Error) => void) => {
            readFile(filename, (err: any, buffer: Buffer) => {
                if (err) reject(err);
                else resolve(buffer.toString());
            });
        },
    );

readFilePromise('./package.json')
    .then((content: string) => {
        console.log(content);
        return readFilePromise('./tsconfig.json');
    })
    .then((content: string) => {
        console.log(content);
        return readFilePromise('.');
    })
    .catch((err: Error) => console.log('error: ', err.message))
    .finally(() => console.log('프로그램 종료'));
