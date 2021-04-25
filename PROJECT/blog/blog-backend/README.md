# 백엔드

- `yarn init -y`로 패키지 정보 생성
- `yarn add koa`로 Koa 웹 프레임워크 설치

## ESLint와 Prettier 설정

- eslint 설치

```powershell
$ yarn add --dev eslint
$ yarn run eslint --init
? How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? CommonJS (require/exports)
? Which framework does your project use? Node
? What format do you want your config file to be in? JSON
```

- prettier 설정

```json
// .prettierrc
{
  "SingleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

- Prettier에서 관리하는 코드 스타일은 ESLint에서 관리하지 않도록 `eslint-config-pritter` yarn add로 설치
- 설정 파일 만들기

```json
// .eslintrc.json
{
  // ...
  "extends": ["eslint:recommended", "prettier"],
  // ...
  "rules": {
    "no-unused-vars": "warn", // 선언하고 사용하지 않은 const 변수 에러가 아니라 위험으로 인식
    "no-console": "off" // console.log 사용해도 에러 안 남
  }
}
```

- 자동으로 저장하는 기능이 활성화되지 않았다면 F1을 누른 후 format이라고 입력해 설정가능

## 미들웨어

- Koa 애플리케이션은 미들웨어의 배열로 구성되어 있음. app.use 함수는 미들웨어 함수를 애플리케이션에 등록해줌
- 미들웨어 함수의 구조

```js
(ctx, next) => {
  // ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있음.
  // next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수 필수값은 아님
};
```

- 미들웨어는 app.use를 사용하여 등록되는 순서대로 처리됨
- 특정 쿼리 파라미터가 포함되어 있으면 미들웨어를 처리하고 아니면 처리하지 않는 방법

```js
app.use((ctx, next) => {
  console.log(ctx.url);
  if (ctx.query.authorized != '1') {
    // 문자열이기 때문에 반드시 문자열로 비교
    ctx.status = 401;
    return;
  }
  next();
});
```

- **next 함수를 호출하면 Promise를 반환** Express와 차별되는 부분
- Koa는 async/await를 정식으로 지원함

## nodemon

- 서버 코드를 변경할 때마다 서버를 자동으로 재시작해 줌.
- `yarn add --dev nodemon` 개발용 의존 모듈로 설치
- package.json에 scripts 설정 추가

```json
"scripts" : {
  "start" : "node src",
  "start:dev" : "nodemon --watch src/ src/index.js"
  // nodemon은 src 디렉터리를 주시하고 있다가 해당 디렉터리 내부의 어떤 파일이 변경되면 이를 감지하여 src/index.js 파일을 재시작함
}
```

```powershell
$ yarn start # 재시작이 필요 없을 때
$ yarn start:dev # 재시작이 필요할 때
```

## koa-router

- `yarn add koa-router`로 설치
- 라우트를 설정할 때, router.get의 첫 번째 파라미터에는 라우트의 경로를 넣고, 두 번째 파라미터에는 해당 라우트에 적용할 미들웨어 함수를 넣음

### 라우트 파라미터와 쿼리

- 라우터의 파라미터를 설정할 때는 _/about/:name_ 형식으로 콜론을 사용하여 라우트 경로를 설정하고 파라미터가 있을 수도 있고 없을 수도 있다면 */about/:name?*같은 형식으로 파라미터 이름 뒤에 물음표를 사용. 이렇게 설정한 파라미터는 함수의 ctx.params 객체에서 조회 가능
- url 쿼리의 경우 ctx.query에서 조회할 수 있음. 쿼리 문자열을 자동으로 객체 형태로 파싱해 주므로 별도로 파싱 함수를 돌릴 필요가 없음.(문자열 형태의 쿼리 문자열을 조회해야 할 때는 ctx.querystring을 사용함)
- 일반적으로 ㅍ파라미터는 처리할 작업의 카테고리를 받아 오거나, 고유 ID 혹은 이름으로 특정 데이터를 조회할 때 사용, 쿼리는 옵션에 관련된 정보를 받아 옴

## mongoose

- `yarn add mongoose dotenv`로 dotenv는 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발 도구
- 스키마는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체
- 모델은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체
- Schema에서 지원하는 타입
  - String : 문자열
  - Number : 숫자
  - Date : 날짜
  - Buffer : 파일을 담을 수 있는 버퍼
  - Boolean : true 또는 false 값
  - Mixed(Schema.Types.Mixed : 어떤 데이터도 넣을 수 있는 형식
  - ObjectId(Schema.Types.ObjectId) : 객체 아이디, 주로 다른 객체를 참조할 때 넣음
  - Array : 배열 형태의 값으로 []로 감싸서 사용
- mongoose.model(스키마 이름, 스키마 객체)
- 스키마 이름이 Post라면 실제 데이터베이스에 만드는 컬렉션 이름은 posts.
- 이름 규칙을 따르고 싶지 않다면 세 번째 파라미터에 원하는 이름 입력. 이런 경우에는 다른 스키마에서 참조할 때 첫 번째 파라미터로 넣어 준 이름 사용

- 데이터 생성과 조회
  1. 데이터 생성
  ```js
  export const write = async ctx => {
    const post = new Post({
      // 인스턴스를 만들 때 new 키워드 사용
      title,
      body,
      tags,
    });
    try {
      await post.save(); // save() 함수를 실행시켜야 비로소 데이터베이스에 저장됨
    }
  };
  ```
  2. 데이터 조회
  ```js
  export const list = async ctx => {
    try {
      const posts = await Post.find().exec(); // find() 함수를 호출한 후에는 exec()를 붙여 주어야 서버에 쿼리를 요청함
    }
  };
  ```
  3. 특정 포스트 조회
  ```js
  export const read = async ctx => {
    const { id } = ctx.params;
    try {
      const post = await Post.findById(id).exec(); // 특정 id를 가진 포스트 찾기
    }
  };
  ```
  4. 데이터 삭제
  ```js
  export const remove = async ctx => {
    const { id } = ctx.params;
    try {
      await Post.findByIdAndRemove(id).exec();
      // remove() : 특정 조건을 만족하는 데이터를 모두 지움
      // findByIdAndRemove() : id를 찾아서 지움
      // findOneAndRemove() : 특정 조건을 만족하는 데이터 하나를 찾아서 제거
    }
  };
  ```
  5. 데이터 수정
  ```js
  export const update = async ctx => {
    const { id } = ctx.params;
    try {
      const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
        new: true,
      }).exec();
    }
  };
  ```
- ObjectId 검증

  ```js
  const { ObjectId } = mongoose.Types;
  ObjectId.isValid(id);
  ```

- Request Body 검증(Joi 라이브러리 사용)
- 데이터 정렬하기

```js
const posts = await Post.find().sort({ _id: -1 }).exdec();
// 오른쪽 값을 1로 설정하면 오름차순, -1로 설정하면 내림차순
```

- 페이지 설정

```js
const posts = await Post.find()
  .limit(10)
  .skip((page - 1) * 10)
  .exec();
```

- Document 개수 세기

```js
const postCount = await Post.countDocuments().exec();
```

- 내용 길이 제한

```js
// 1. JSON 형태로 변환한 뒤 변형 일으키기
ctx.body = posts
  .map(post => post.toJSON())
  .map(post => ({
    ...post,
    body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
  }));
```

```js
// 2. 아예 JSON으로 조회하기
const posts = await Post.find().lean().exec();
ctx.body = posts.map(post => ({
  ...post,
  body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
}));
```
