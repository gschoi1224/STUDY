# 프로젝트 생성과 관리

## 타입스크립트 프로젝트 만들기

-   npm init 명령을 실행해 생성

### 프로젝트 생성자 관점에서 패키지 설치하기

-   프로젝트 구현에 필요한 다양한 오픈소스 패키지를 npm install 또는 간단히 npm i 명령으로 설치할 수 있음
-   옵션
    -   \--save(-S) : 프로젝트를 실행할 때 필요한 패키지로 설치함. 패키지 정보가 package.json의 'dependencies' 항목에 등록됨
    -   \--save-dev(-D) : 프로젝트를 개발할 때만 필요한 패키지로 설치함. 패키지 정보가 package.json의 'devDependencies' 항목에 등록됨
-   타입스크립트 프로젝트는 보통 typescript와 ts-node 패키지를 설치함. 이 프로젝트를 전달받아서 이용하는 다른 개발자의 컴퓨터에는 두 패키지가 전역에 설치되어 있지 않을 수도 있기 때문에 -D 옵션을 사용해 설치해 package.json에 등록하는 것이 좋음
-   JS로 개발된 chance, ramda와 같은 라이브러리들은 추가로 @types/chance, @types/ramda와 같은 타입 라이브러리들을 제공해야 함
-   Promise와 같은 타입을 사용하려면 @types/node라는 패키지를 설치해야 함

### 프로젝트 이용자 관점에서 패키지 설치하기

-   패키지를 전달 받아 이용할 때는 가장 먼저 package.json 파일이 있는 디렉터리에서 `npm i`명령을 실행

### tsconfig.json 파일 만들기

-   타입스크립트 프로젝트는 타입스크립트 컴파일러의 설정 파일인 tsconfig.json 파일이 있어야 함. 이 파일은 `tsc --init` 명령으로 만들 수 있음

### src 디렉터리와 소스 파일 만들기

-   tsconfig.json 파일에서 include 항목에 ["src/**/*"]라는 값이 설정되어 있는데, 이것은 ./src와 ./src/utils 디렉터리에 이 프로젝트의 모든 타입스크립트 소스 파일이 있다는 뜻임
-   tsconfig.json 설정대로 프로젝트를 구성하고자 `mkdir -p src/utils` 폴더 만들기 (-p는 해당 경로로 가는 도중에 없는 폴더 있으면 다 만듦)
-   각 디렉터리에 필요한 소스 파일 만들기 `touch src/index.ts src/utils/makePerson.ts`

### package.json 수정

-   타입스크립트 프로젝트를 개발할 때는 ts-node를 사용하지만, 막상 개발이 완료되면 타입스크립트 소스코드를 ES5 JS 코드로 변환해 node로 실행해야 함.
-   이를 위해 package.json 파일을 열고 scripts 항목에 dev와 build 명령을 추가

```json
"script" : {
    "dev" : "ts-node src",
    "build" : "tsc && node dist"
}
```

-   `npm run 명령` 형태로 사용

## ts.config

### module 키

-   타입스크립트 소스코드가 컴파일되어 만들어진 ES5 자바스크립트 코드는 웹 브라우저와 노드제이에스 양쪽에서 모두 동작해야 함.
-   웹 브라우저에서는 AMD방식, 노드제이에스에서는 CommonJS 방식으로 동작함.
-   tsconfig.ts 파일에서 compilerOptions 항목의 module 키는 동작 대상 플랫폼이 웹 브라우저인지 노드제이에스인지를 구분해 그에 맞는 모듈 방식으로 컴파일하려는 목적으로 설정함.

### moduleResolution 키

-   module의 키 값이 commonjs이면 노드제이에서 동작하는 것을 의미하므로, moduleResolution 키값은 항상 node로 설정.
-   amd이면 classic으로 설정.

### target 키

-   트랜스파일할 대상 자바스크립트의 버전을 설정.
-   대부분 es5를 키값으로 설정함. 만일 최신 버전의 노드제이에스를 사용한다면 es6으로 설정.

### baseUrl과 outDir 키

-   트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉터리를 설정.
-   baseUrl : tsconfig.ts가 있는 디렉터리에서 실행되므로 현재 디렉터리를 의미하는 "."으로 설정
-   OutDir : baseDir 설정값을 기준으로 했을 때 하위 디렉터리의 이름. 이 키는 dist라는 값을 설정했으므로 빌드된 결과가 dist 디렉터리에 만들어짐.

### paths 키

-   소스 파일의 import 문에서 from 부분을 해석할 때 찾아야 하는 디렉터리를 설정.
-   import 문이 찾아야 하는 소스가 외부 패키지이면 node_modules 디렉터리에서 찾아야 하므로 키값에 node_modules/\*도 포함

### esModuleInterop 키

-   오픈소스 js 라이브러리 중에 웹 브라우저에서 동작한다는 가정으로 만들어진 것이 있는데 이들은 commonJS 방식으로 동작하는 타입스크립트 코드에 혼란을 줄 수 있으므로 esModuleInterop 키값을 반드시 true로 설정해야 함

### sourceMap 키

-   ture이면 트랜스파일 디렉터리에는 .js파일 외에도 .js.map 파일이 만들어짐.
-   이 파일은 변환된 js 코드가 ts 코드의 어디에 해당하는지를 알려줌.

### downlevelIteration 키

-   생성기 구문을 사용할 때 반드시 true로 설정

### nolmplicitAny 키

-   f(a, b)의 경우 f(a: any, b:any) 암시적으로 any 타입을 설정한 것으로 간주하지만 에러가 발생해서 혼란을 야기하기 때문에 false로 설정하면 에러가 발생하지 않음.
