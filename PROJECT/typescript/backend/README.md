# 빅데이터 배치 프로그램

## 패키지

### 기본

> npm i -D typescript ts-node @types/node

### 디렉터리 생성/삭제

> npm i -S mkdirp rimraf

> npm i -D @types/mkdirp @types/rimraf

### 가짜 데이터 만들기

> npm i -S chance

> npm i -D @types/chance

## CSV 파일 생성기

-   데이터를 파일에 저장할 때 보통 테이블 형태의 데이터는 파일 확장자가 .csv(comma seprated values)인 파일에 저장
-   맨 첫의 헤더 정보에 데이터를 나타내는 이름을 쉼표로 구분하고 그 다음 줄부터 각 이름에 해당하는 데이터를 똑같이 쉼표로 구분

## 프로그램 명령 줄 인수 읽기

-   프로그램을 실행하면서 실행 명령 뒤에 여러 개의 매개변수로 입력된 값을 `명령 줄 인수` 라고 함
-   노드제이에스에서 제공하는 process라는 내장 객체의 argv 배열 속성에서 얻을 수 있음

## 파일 처리 비동기 함수 구현하기

1. [fs.access API로 디렉터리나 파일 확인하기](./src/fileAPI/fileExists.ts)
2. [mkdirp 패키지로 디렉터리 생성 함수 만들기](./src/fileAPI/mkdir.ts)(mkdir -p와 같은 역할)
3. [rimraf 패키지로 디렉터리 삭제 함수 만들기](./src/fileAPI/rmdir.ts)(비어 있지 않은 디렉터리도 삭제 가능)
4. [fs.writeFile API로 파일 생성하기](./src/fileAPI/writeFile.ts)
5. [fs.readFile API로 파일 내용 읽기](./src/fileAPI/readFile.ts)
6. [fs.appendFile API로 파일에 내용 추가하기](./src/fileAPI/appendFile.ts)
7. [fs.unlink API로 파일 삭제하기](./src/fileAPI/deleteFile.ts)
8. [index.ts 파일로 다 export 하기](./src/fileAPI/index.ts)

## 가짜 데이터 만들기

-   [가짜 데이터 인터페이스](./src/fake/IFake.ts)
-   [가짜 데이터 만드는 함수](./src/fake/makeFakeData.ts)

## Object.keys와 Object.values 함수 사용하기

-   각각 객체의 속성 이름과 속성갑승로 구성된 배열 뽑아내기

## CSV 파일 만들기

-   가짜 데이터를 여러 개 생성해 순서대로 넣기 위해 [range함수](./src/utils/range.ts) 필요
-   makeFakeData를 사용해 numberOfItems 만큼 IFake 객체를 생성
-   속성명과 속성값의 배열을 각각 추출해 filename 파일 만들기
-   CSV 파일의 첫 줄에 객체의 속성 이름을 쉼표로 구분해서 작성해야 하기 때문에 객체의 속성 이름을 생략한 채 속성값만 한 줄 한 줄 파일에 쓰기
-   index.ts로 수출

## 데이터를 CSV 파일에 쓰기

-   ts-node src/writeCsv.ts [파일명] [데이터수]로 실행해 가짜 데이터가 든 csv 파일 만들기

## zip 함수 만들기

-   csv포맷 파일을 읽는 코드 작성하기
-   객체의 속성명 배열과 속성값 배열을 결합해 객체를 만드는 함수를 보통 zip이라는 이름으로 구현
-   [zip 함수](./src/utils/zip.ts)

## csv 파일 데이터 읽기

-   `생성기 함수를 구현할 때는 비동기 함수 사용할 수 없음!`
-   파일을 한 줄씩 읽는 방식으로 생성기 구현하는 것이 방법
-   [Buffer 타입 객체를 생성해 파일을 1,024Byte씩 읽으며 한 줄씩 찾은 뒤, 찾을 줄의 데이터를 yield 문으로 발생시킴](./src/fileApi/readFileGenerator.ts)

# 몽고 DB에 저장하기

## 패키지

> npm i -S mongodb

> npm i -D @types/mongodb

## 데이터베이스 연결

-   [MongoClient의 connect 함수를 사용해 몽고DB에 접속](./src/mongodb/connect.ts)
-   import 문으로 하면 에러나고 require 하니까 에러가 나지 않는 이유가 뭘까
-   [데이터베이스 생성하기](./src/test/makedb-test.ts)

## 컬렉션

-   관계형 DB에서의 테이블
-   [컬렉션 생성](./src/test/collection-test.ts)

## 문서를 컬렉션에 저장하기

-   [문서를 컬렉션에 저장하는 것은 컬렉션 객체가 제공하는 insertOne 메서드를 사용해 구현](./src/test/insert-document-test.ts)

## 문서 찾기

-   특정 컬렉션에 담긴 문서들은 find 메서드로 찾을 수 있음
-   [find 메서드는 자바스크립트 배열에서 찾은 객체를 주지 않고, 일단 cursor라는 이름의 객체를 반환하며 cursor 객체의 toArray 메서드로 js 배열을 얻을 수 있음](./src/test/find-test.ts)
-   findOne메서드는 하나만 찾기 때문에 cursor 대신 문서 객체 자체를 반환함

## 문서 삭제하기

-   [deleteOne 또는 deleteMany 메서드를 사용해 삭제](./src/test/delete-test.ts)
-   deleteCount라는 이름의 속성에 삭제된 문서의 개수가 담긴 객체를 반환

## 검색 결과 정렬하기

-   find 메서드로 검색한 결과는 sort 메서드를 연이어 호출해 검색 결과를 오름차순 또는 내림차순으로 정렬할 수 있음
-   컬렉션에 문서 개수가 많아지면 검색 시간이 느려지는데 이를 방지하기 위해 컬렉션에 인덱스를 만들게 됨. 인덱스는 컬렉션 객체의 createIndex 메서드를 사용해 만들 수 있으며 인덱스 항목은 오름차순 정렬일 때는 1, 내림차순 정렬일 때는 -1을 설정

## CSV 파일 몽고DB에 저장하기

-   [readCsv.ts 파일 수정해 몽고DB에 담기](./src/insert-csv-mongo.ts)

# 익스프레스로 API 서버 만들기

## 패키지

> npm i -S express body-parser cors

> npm i -D @types/express @types/body-parser @types/cors

## 라우팅 기능

-   app.get('url', 콜백 함수) url부분에 :파라미터 형식으로 작성하면 req.params에서 그 이름으로 된 값을 얻을 수 있다
