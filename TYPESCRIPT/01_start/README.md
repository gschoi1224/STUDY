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
