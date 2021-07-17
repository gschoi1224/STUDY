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

## Promise

### 생성

-   new 연산자를 적용해 객체를 만들어야 함.

### resolve와 reject 함수

-   프로미스를 사용하는 예시

```ts
import { readFile } from 'fs'
const readFilePromise = (filename: string): Promise<string> => new Promise<string>((
    resolve: (value: string) => void,
    reject: (error: Error) => void => {
        readFile(filename, (err: Error, buffer: Buffer) => {
            if(err) reject(err)
            else resolve(buffer.toString())
        })
    }
))
```

-   then, catch, finally 메서드를 메서드 체인 형태로 받음

```ts
readFilePromise('./package.json')
    .then((content: string) => {
        console.log(content); // package.json 파일을 읽은 내용
        return readFilePromise('./tsconfig.json');
    })
    .then((content: string) => {
        console.log(content); // tsconfig.json 파일 내용
        return readFilePromise('.');
    })
    .catch((err: Error) => console.log('error: ', err.message))
    .finally(() => console.log('프로그램 종료'));
```

-   Promise.resolve(값) 형태로 호출하면 항상 이 값은 then 메서드에서 얻을 수 있음.
-   Promise.reject(Error 타입 객체)를 호출하면 이 'Erorr 타입 객체'는 항상 catch 메서드의 콜백 함수에서 얻을 수 있음

### then-체인

-   then에서 반환된 값은 또 다른 then 메서드를 호출해 값을 수신할 수 있음.
-   then 메서드는 반환된 값이 Promise 타입이면 이를 해소(resolve)한 값을 반환하고 만약 거절당한 값일 때는 catch 메서드에서 이 거절당한 값을 얻을 수 있음.

```ts
Promise.resolve(1)
    .then((value: number) => {
        console.log(value); // 1
        return Promise.sresolve(true);
    })
    .then((value: boolean) => {
        console.log(value); // true
        return [1, 2, 3];
    })
    .then((value: number[]) => {
        console.log(value); // [1, 2, 3]
        return { name: 'jack', age: 32 };
    })
    .then((value: { name: string; age: number }) => {
        console.log(value); // {name: 'jack', age: 32}
    });
```

### Promise.all 메서드

-   Promise 클래스는 Array에서 제공하는 every메서드(배열의 모든 아이템이 어떤 조건을 만족하면 true를 반환함)처럼 동작하는 all이라는 이름의 클래스 메서드를 제공함.
-   Promise 객체들을 배열 형태로 받아, 모든 객체를 대상으로 해소된 값들의 배열로 만들어 줌.
-   해소된 값들의 배열은 then 메서드를 호출해서 얻어야 함.
-   만약, 배열에 담긴 Promise 객체 중 거절 객체가 발생하면 더 기다리지 않고 해당 거절 값을 담은 Promise.reject 객체를 반환함.

```ts
const getAllResolveResult = <T>(promises: Promise<T>[]) =>
    Promise.all(promises);

getAllResolvedResult<any>([
    Promise.resolve(true),
    Promise.resolve('hello'),
]).then(result => console.log(result)); // [true, 'hello']

getAllResolvedResult<any>([
    Promise.reject(new Error('error')),
    Promise.resolve(1),
])
    .then(result => console.log(result)) // 호출되지 않는다
    .catch(error => console.error(error)); // error
```

### Promise.race 메서드

-   Array 클래스에서 제공하는 some메서드(배열의 내용 중 하나라도 조건을 만족하면 true를 반환하는 some이라는 인스턴스 메서드를 제공)와 같은 역할을 하는 메서드
-   거절 값이 가장 먼저 발생하면 Promise.reject 객체를 반환함.

```ts
Promise.race([Promise.resolve(true), Promise.resolve('hello')]).then(value =>
    console.log(value),
); // true

Promise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])
    .then(value => console.log(value)) // true
    .catch(error => console.log(error.message)); // 호출되지 않는다

Promise.race([Promise.reject(new Error('error'), Promise.resolve(true))])
    .then(value => console.log(value)) // 호출 안 됨
    .catch(err => console.error(err)); // 호출됨
```

## async & await

-   await : 피연산자의 값을 반환해 주며 피연산자가 Promise 객체이면 then 메서드를 호출해 얻은 값을 반환해 줌.
-   async : 함수 몸통에서 await을 쓸 때 메서드 앞에 붙여줘야 하는 함수 수정자

### async 함수

-   일반 함수처럼 사용할 수 있다.
-   Promise 객체로 사용할 수 있다.
-   반환값이 Promise 형태이므로 then 메서드를 호출해 async 함수의 반환값을 얻어야 함.

```ts
const asyncReturn = async () => {
    return [1, 2, 3];
};
asyncReturn().then(value => console.log(Value)); // [1, 2, 3]
```

-   예외가 발생하면 프로그램이 비정상으로 종료됨.
-   비정상으로 종료하는 상황을 막으려면, asyncException을 단순히 asyncException() 형태의 호출 방식이 아닌, asyncException()이 반환하는 프로미스 객체의 catch 메서드를 호출하는 형태로 코드를 작성해야 함.

```ts
const awaitReject = async () => {
    await Promise.reject(new Error('error'));
};
awaitReject().catch(err => console.log('error: ', err.message)); // error: error
```

### async 함수와 Promise.all

```ts
const readFilesAll = async (filenames: string[]) => {
    return await Promise.all(
        filenames.map(filename => readFilePromise(filename)),
    );
};
readFilesAll(['./package.json', './tsconfig.json'])
    .then(([packageJson, tsconfigJson]: string[]) => {
        console.log('<package.json>: ', packageJson);
        console.log('<tsconfig.json>: ', tsconfigJson);
    })
    .catch(err => console.log('error: ', err.message));
```
