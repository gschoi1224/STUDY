# 객체와 타입

## 타입스크립트 변수 선언문

### 타입스크립트 기본 제공 타입

-   number : 수 타입
-   boolean : 불리언 타입
-   string : 문자열 타입
-   object : 객체 타입

### 타입 주석

-   ts는 js 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시할 수 있고, 이름 `타입 주석(type annotation)`이라고 함.

```ts
let 변수 이름 : 타입[=초깃값]
const 변수 이름 : 타입 = 초깃값
```

### 타입 추론

-   ts는 js와 호환성을 위해 타입 주석 부분을 생략할 수 있음
-   ts 컴파일러는 다음과 같은 코드를 만나면 대입 연산자 오른쪽 값에 따라 변수의 타입을 지정함.

```ts
let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = 'hello'; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단
```

### any 타입

-   값을 타입과 무관하게 어떤 종류의 값도 저장할 수 있음.

### undefined 타입

-   변수를 초기화하지 않으면 해당 변수는 undefined를 가짐.
-   ts에서 undefined는 타입이기도 하고 값이기도 함.

```ts
let u: undeinfed = undefined;
u = 1; // Type '1' is not assignable to type 'undeinfed' 오류 발생
```

## 객체

-   object 타입으로 선언된 변수는 number, boolean, string 타입의 값을 가질 수는 없지만 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있음.

```ts
let o: obejct = { name: 'Jack', age: 32 };
o = { first: 1, second: 2 }; // 항상 name과 age 속성으로 구성된 객체만 가질 수 있게 해서 오류 발생
```

## 인터페이스

### 인터페이스 선언문

-   객체의 타입을 정의할 수 있게 하는 것이 목적

```ts
interface 인터페이스 이름 {
    속성 이름[?] : 속성 타입[....]
}
interfac IPerson {
    name : string
    age:  number
}
```

-   객체의 타입 범위를 좁히는게 목적

### 선택 속성 구문

-   있어도 되고 없어도 되는 형태로 만들고 싶을 때 사용
-   속성 이름 뒤에 물음표 기호를 붙여서 만듦

```ts
interface IPerson2 {
    name: string; // 필수
    age: number; // 필수
    etc?: boolean; // 선택
}
```

### 익명 인터페이스

-   interface 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있음.

```ts
let ai: {
    name: string;
    age: number;
    etc?: boolean;
} = { name: 'Jack', age: 32 };
```

-   함수를 구현할 때 사용

```ts
function printMe(me: { name: string; age: number; etc?: boolean }) {
    console.log(
        me.etc ? `${me.name} ${me.age} ${me.etc}` : `${me.name} ${me.age}`,
    );
}
printMe(ai); // Jack 32
```

## 클래스

### 클래스 선언문

-   클래스 선언문의 기본 형태

```ts
class className {
    [private | protected | public] 속성이름[?]:속성타입[...]
}
```

-   클래스에 new 연산자를 적용해 변수를 만드는 형태

```ts
class Person1 {
    name: string;
    age?: number;
}
let jack1: Person1 = new Person1();
jack1.name = 'Jack';
jack1.age = 32;
console.log(jack1); // Person1 {name : 'Jack', age : 32}
```

### 접근 제한자

-   public, private, protected 와 같은 접근 제한자를 이름 앞에 붙일 수도 있고 생략하면 public으로 간주

### 생성자

-   ts의 클래스는 constructor라는 이름의 특별한 메서드를 포함하는데, 이를 생성자 라고 함.
-   다른 언어와 다르게 ts 클래스는 constructor로 클래스의 속성을 선언할 수 있음.

```ts
class Person2 {
    constructor(public name: string, public age? number) {}
}
class Person3 {
    name : string
    age? : number
    constructor(name : string, age?:number) {
        this.name = name; this.age = age
    }
}
// Person2와 Person3은 같음
let jack2 : Person2 = new Person2('Jack', 32)
console.log(jack2) // Person2 { name : 'Jack', age : 32 }
```

### 인터페이스 구현

-   인터페이스는 이러이러한 속성이 있어야 한다는 규약에 불과할 뿐 물리적으로 해당 속성을 만들지는 않음.
-   클래스 몸통에는 반드시 인터페이스가 정의하고 있는 속성을 멤버 속성으로 포함해야 함.

### 추상 클래스

-   추상 클래스는 자신의 속성이나 메서드 앞에 abstract를 붙여 나를 상속하는 다른 클래스에서 이 속성이나 메서드를 구현하게 함.
-   abstract가 붙으면 new 연산자를 적용해 객체를 만들 수 없음.

```ts
abstract class abstractPerson {
    abstract name: string;
    constructor(public age?: number) {}
}
```

## 클래스의 상속

-   extends 키워드를 사용해 상속 클래스를 만들 수 있음
-   부모 클래스의 생성자를 super 키워드로 호출

```ts
class Person5 extends abstractPerson {
    consturctor(public name: string, age?: number) {
        super(age);
    }
}
```

### static 속성

```ts
class A {
    static initValue = 1;
}
let initVal = A.initValue; // 1
```

## 객체의 비구조화 할당문

### 비구조화란?

-   구조화된 데이터는 어떤 시점에서 데이터의 일부만 사용해야 할 때가 있고 어느 시점부터 일부 데이터만 사용하게 될 때 구조화된 데이터를 분해하는 것

### 비구조화 할당

-   ESNext 자바스크립트의 구문으로 타입스크립트에서도 사용할 수 있음.
-   배열과 튜플에도 적용 가능

```ts
let jack: IPerson = { name: 'Jack', age: 32 };
let { name, age } = jack;
```

### 잔여 연산자(...)

```ts
let address: any = {
    country: 'Korea',
    city: 'Seoul',
    address1: 'Gangnam-gu',
    address2: 'Sinsa-dong 123-456',
    address3: '789 street, 2 Floor ABC building',
};
const { country, city, ...detail } = address;
console.log(detail); // {address1: 'Gangnam-gu', address2: 'Sinsa-dong 123-456', address3: '789 street, 2 Floor ABC building'}
```

### 전개 연산자(...)

-   점 3개 연산자가 비구조화 할당문이 아닌 곳에서 사용될 때 이를 전개 연산자라 함

```ts
let coord = { ...{ x: 0 }, ...{ y: 0 } };
console.log(coord); // {x: 0, y: 0}
```

## 객체 타입의 변환

### 타입 변환

```ts
let person: object = { name: 'Jack', age: 32 };
person.name; // object는 name을 포함하지 않아 오류 발생
let person: object = { name: 'Jack', age: 32 };
(<{ name: string }>person).name; // 일시적으로 name 속성이 있는 타입으로 변환해 속성값 얻게 함
```

### 타입 단언

-   타입 단언의 두 가지 형태

```ts
(<타입>rorcp)(객체 as 타입);
```

```ts
export default interface INameble {
    name: string;
}
import INameble from './INameble';
let obj: object = { name: 'Jack' };

let name1 = (<INameble>obj).name;
let name2 = (obj as INameble).name;
console.log(name1, name2); // Jack Jack
```
