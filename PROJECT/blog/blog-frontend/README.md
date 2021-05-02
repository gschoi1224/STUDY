# 프론트엔드

## 라우트

-   LoginPage.js - 로그인
-   RegisterPage.js - 회원가입
-   WritePage.js - 글쓰기
-   PostPage.js - 포스트 읽기
-   PostListPage.js - 포스트 목록
    <br/>※ '/@:username' path는 '@'뒤에 있는 문자를 username 파라미터로 읽을 수 있게 해 줌

## 리덕스

-   Ducks 패턴 사용해 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의되어 있는 리덕스 모듈
-   immer를 통해 불변성 관리
-   컨테이너 컴포넌트에서는 connect 함수 대신 useDispatch와 useSelector Hooks를 사용하여 구현
-   비동기 작업은 axios와 redux-saga 사용
-   package.json에 proxy 등록을 하면 웹팩 개발 서버가 프록시 역할을 해서 대신 요청을 하고 결과물을 응답해 줌

```json
    "proxy" : "http://localhost:4000"
```
