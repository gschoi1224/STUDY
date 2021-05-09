# 타입스크립트

- 자바 스크립트의 세 가지 종류 중 하나
  1. 웹 브라우저에서 동작하는 표준 자바스크립트인 ES5(ECMAScript 5)
  2. 2015년부터 매년 새로운 버전을 발표하는 ESNext
  3. ESNext에 타입(type) 기능을 추가한 타입스크립트
- 대규모 소프트웨어를 개발할 때 선호됨(협업시 에러 방지)
- 타입스크립트 소스코드는 TSC라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환됨

## 타입스크립트 고유 문법

- 타입 주석과 타입 추론 : 변수 뒤에 콜론과 타입 이름을 쓰는 것

```ts
let n: number = 1;
let m = 2; // 타입 이름 생략 가능. 생략하면 오른쪽의 값을 분석해 왼쪽 변수의 타입을 결정함(타입 추론)
```

- 인터페이스

```ts
interface Person {
  name: string;
  age: number;
}
let person: Person = {name: "Jane"};
```

- 튜플 : 배열에 저장되는 아이템의 데이터 타입이 모두 같으면 배열, 다르면 튜플

```ts
let numberArray: number[] = [1, 2, 3]; // 배열
let tuple: [boolean, number, string] = [true, 1, "Ok"]; // 튜플
```

- 제네릭 타입 : 다양한 타입을 한꺼번에 취급할 수 있게 해 줌

```ts
class Container<T> {
  constructor(public value: T) {}
}
let numberContainer: Container<number> = new Container<number>(1);
let stringContainer: Container<string> = new Container<string>("Hello world");
```

- 대수 타입(ADT : abstract data type 또는 algebraic data type) : 다른 자료형의 값을 가지는 자료형을 의미함.

```ts
type NumberOrString = number | string; // 합집합 타입
type AnimalAndPerson = Animal & Person; // 교집합 타입
```

## 개발 환경

- scoop 프로그램 설치(scoop으로 설치한 프로그램들은 scoop update \* 명령으로 한꺼번에 가장 최신 버전으로 업데이트됨)
  1. 윈도우 파워쉘 실행
  2. 명령어 실행
  ```powershell
  Set-ExecutionPolicy RemoteSigned -scope CurrentUser # 실행 후 A 입력
  # 세 번째 명령이 정상적으로 동작하도록 위도우 실행 규칙을 변경함
  $env:SCOOP='C:\Scoop'
  # 앞으로 scoop을 이용해 설치하는 모든 프로그램의 경로를 C:\Scoop으로 설정
  iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
  # scoop을 설치
  scoop install aria2
  # scoop이 다중 내려받기를 할 수 있게 해 줌
  scoop install git
  # git 설치
  ```
- 비주얼 스튜디오 코드 설치

  1. VSCode 설치

  ```powershell
  scoop bucket add extras # 두 번째 명령에 필요한 scoop 부가 정보를 설치
  scoop install vscode # VSCode 설치
  ```

  2. VSCode를 마우스 오른쪽 단축 메뉴에 등록

     - Scoop 폴더의 apps/vscode/current 디렉터리에 있는 vscode-install-context.reg 파일을 실행

  3. View -> Extensions 또는 Ctrl + Shift + X 를 눌러 마켓플레이스에서 Korean 확장 팩 설치한 후 재시작
  4. 터미널 단축키 : ctrl + `

- Node.js 설치

  ```powershell
  scoop install nodejs-lts # nodejs 안정 버전 설치
  node -v
  ```

- 구글 크롬 브라우저 설치
  ```powershell
  scoop install chromium  # 오픈소스 버전의 크롬 브라우저 설치
  chrome # chrome
  ```
- 타입스크립트 컴파일러 설치 : 타입스크립트는 Node.js 환경에서만 동작하기 때문에 npm을 사용해 설치

  ```powershell
  npm i -g typescript
  tsc -v
  ```

- touch 프로그램 설치 : 파일을 생성할 때 지정한 이름의 파일이 이미 있으면 무시하고, 없으면 해당 이름으로 파일을 만들어 줌

```powershell
scoop install touch
```

- ts-node 설치 : tsc는 타입스크립트 코드를 ES5 형식의 JS 코드로 변환만 할 뿐 실행하지는 않는다. 실행까지 동시에 하려먼 ts-node 라는 프로그램을 설치해야 함

```powershell
npm i -g ts-node
```
