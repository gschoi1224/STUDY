# Promise와 async/await 구문

-   노드제이에스에서 제공하는 API를 사용하려면 tsconfig.json 파일의 downlevelIteration 항목을 true로 설정해야함

## 비동기 콜백 함수

```ts
import { readFileSync, readFile } from 'fs';

// package.json 파일을 동기 방식으로 읽는 예
console.log('read package.json using synchronous api...');
const buffer: Buffer = readFileSync('./package.json');
console.log(buffer.toString());

// package.json 파일을 비동기 방식으로 읽는 예
const readFilePromise = (filename: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        readFile(filename, (error: Error, buffer: Buffer) => {
            if (error) reject(error);
            else resolve(buffer.toString());
        });
    });

(async () => {
    const content = await readFilePromise('./package.json');
    console.log('read package.json using Promise and async/await ...');
    console.log(content);
})();
```

### 단일 스레드와 비동기 API

-   자바스크립트는 단일 스레드로 동작하므로 될 수 있으면 readFileSync와 같은 동기 API를 사용하지 말아야 함.
-   코드를 작성하기는 쉽지만 프로그램의 반응성을 떨어뜨림.

### 콜백 지옥

-   비동기 API를 사용하면 콜백 함수에서 다시 또 다른 비동기 API를 호출하는 코드를 만들 때 코드가 매우 복잡해짐.
-   복잡한 형태로 얽인 콜백 구조를 자바스크립트 분야에서는 `콜백 지옥`이라고 표현하며 Promise는 이런 콜백 지옥에 빠진 코드를 좀 더 다루기 쉬운 형태의 코드로 만들려는 목적으로 고안됨.
