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

## 생성기

-   yield는 function\* 키워드를 사용한 함수에서만 호출할 수 있는 return 키워드처럼 값을 반환하는 키워드

```ts
function* generator() {
    console.log('generator started...');
    let value = 1;
    while (value < 4) yield value++;
    console.log('generator finished...');
}
for (let value of generator()) console.log(value);
// 실행결과
// generator started...
// 1
// 2
// 3
// generator finished...
```

### setInterval 함수와 생성기의 유사성

-   생성기가 동작하는 방식을 세미코루틴(타입스크립트처럼 단일 스레드로 동작하는 프로그래밍 언어가 마치 다중 스레드로 동작하는 것처럼 보이게 하는 기능)이라고 한다.

### function\* 키워드

-   function* 키워드로 생성된 함수가 생성기인데, 생성기는 오직 function* 키워드로 선언해야 하므로 화살표 함수로는 생성기를 만들 수 없음.
-   function\*은 function 키워드에 별표(\*)를 붙인 것이 아니라 function\*이 키워드임.
-   사이에 공백은 있어도 되고 없어도 됨.

### yield 키워드

-   연산자 형태로 동작하며 반복기를 자동으로 만들어 주고 반복기 제공자 역할도 수행함.

```ts
function* rangeGenerator(from: number, to: number) {
    let value = from;
    while (value < to) {
        yield value++;
    }
}
// while 패턴으로 동작하는 생성기
let iterator = rangeGenerator(1, 3 + 1);
while (1) {
    const { value, done } = iterator.next();
    if (done) break;
    console.log(value); // 1 2 3
}

// for ...of 패턴으로 동작하는 생성기
for (let value of rangeGenerator(4, 6 + 1)) console.log(value); // 4 5 6
```

### 반복기 제공자의 메서드로 동작하는 생성기 구현

```ts
class IterableUsingGenerator<T> implements Iterable<T> {
    constructor(private values: T[] = [], private currentIndex: number = 0) {}
    [Symbol.iterator] = function* () {
        while (this.currentIndex < this.values.length)
            yield this.values[this.currentIndex++];
    };
}

for (let item of new IterableUsingGenerator([1, 2, 3])) console.log(item); // 1 2 3
```

### yield\* 키워드

-   yield는 단순히 값을 대상으로만 동작하지만, yield\*는 다른 생성기나 배열을 대상으로 동작함.

```ts
function* gen12() {
    yield 1;
    yield 2;
}
function* gen12345() {
    yield* gen12();
    yield* [3, 4];
    yield 5;
}

for (let value of gen12345()) console.log(value); // 1 2 3 4 5
```

### yield 반환값

-   yield 연산자의 반환값을 select 라는 변수에 저장

```ts
function* gen() {
    let count = 5;
    let select = 0;
    while (count--) {
        select = yield `you select ${select}`;
    }
}
const random = (max, min = 0) => Math.round(Math.random() * (max - min)) + min;
```

-   yield 연산자의 반환값은 반복기의 netx 메서드 호출 때 매개변수에 전달하는 값이고 next 메서드 호출 때 난수를 생성해 전달함

```ts
const iter = gen();
while (true) {
    const { value, done } = iter.next(random(10, 1));
    if (done) break;
    console.log(value);
}
// 실행 결과
// you select 0
// you select 4
// you select 3
// you select 6
// you select 6
```
