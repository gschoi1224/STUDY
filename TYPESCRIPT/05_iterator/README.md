# 반복기와 생성기

## 반복기

### 실습 프로젝트 설정

```powershell
npm init --y
npm i -D typescript ts-node @types/node
mkdir src
tsc --init
```

-   error TS5023: Unknown option 'init' -> `yarn tsc --init 하니 해결됨`
-   downlevelIteration을 true로 설정해야됨

```json
tsconfig.json
"downlevelIteration" : true
```

### 반복기

-   next라는 이름의 메서드를 제공함
-   next 메서드는 value와 done이라는 두 개의 속성을 가진 객체를 반환함

### 반복기 제공자

-   반복기를 제공하는 역할을 하는 함수

```ts
const createRangeIterable = (from: number, to: number) => {
    let currentValue = from;
    return {
        next() {
            const value = currentValue < to ? currentValue++ : undefined;
            const done = value == undefined;
            return { value, done };
        },
    };
};
const iterator = createRangeIterable(1, 3 + 1); // 반복기는 현재 동작하지 않는다
while (true) {
    const { value, done } = iterator.next(); // 반복기를 동작시킨다
    if (done) break;
    console.log(value); // 1 2 3
}
```

### 반복기 사용 이유

-   필요할 때만 생성해서 사용하기 때문에 시스템 메모리의 효율성이 더 좋음

### for ...of 구문과 [Symbol.iterator] 메서드

-   range함수는 for...of 구문의 of 뒤에 올 수 있지만 createIterable 함수는 '[Symbol.iterator]() 메서드가 없다'는 오류가 발생
-   createRangeInterable 함수를 클래스로 구현하면 해결됨

```ts
class RangeIterable {
    constructor(public from: number, public to: number) {}
    [Symbol.iterator]() {
        const that = this;
        let currentValue = that.from;
        return {
            next() {
                const value =
                    currentValue < that.to ? currentValue++ : undefined;
                const done = value == undefined;
                return { value, done };
            },
        };
    }
}
const iterator = new RangeIterable(1, 3 + 1);
for (let value of iterator) console.log(value); // 1 2 3
```

### Iterable<T>와 Iterator<T> 인터페이스

-   Iterable<T>: 자신을 구현하는 클래스가 [Symbol.iterator] 메서드를 제공한다는 것을 명확하게 알려주는 역할

```ts
class 구현 클래스 implements Iterable<생성할 값의 타입>
```

-   Iterator<T>: 반복기가 생성할 값의 타입을 명확하게 해 줌

```ts
[Symbol.iterator](): Iterator<생성할 값의 타입> {}
```

-   Iterable<T>와 Iterator<T>를 사용해 구현한 예

```ts
class StringIterator implements Iterable<string> {
    constructor(
        private strings: string[] = [],
        private currentIndex: number = 0,
    ) {}
    [Symbol.itrator](): Iterator<string> {
        const that = this;
        let currentIndex = that.currentIndex,
            length = that.strings.length;

        const iterator: Iterator<string> = {
            next(): { value: string; done: boolean } {
                const value =
                    currentIndex < length
                        ? that.string[currentIndex++]
                        : undefined;
                const done = value == undefined;
                return { value, done };
            },
        };
        return iterator;
    }
}
for (let value of new StringIterable(['hello', 'world', '!']))
    console.log(value);
// 실행 결과
// hello
// world
// !
```
