# 프론트엔드

## 라우트

-   LoginPage.js - 로그인
-   RegisterPage.js - 회원가입
-   WritePage.js - 글쓰기
-   PostPage.js - 포스트 읽기
-   PostListPage.js - 포스트 목록
    <br/>※ '/@:username' path는 '@'뒤에 있는 문자를 username 파라미터로 읽을 수 있게 해 줌

-   history 객체를 사용하고 싶으면 withRouter(react-router-dom)으로 객체를 감싸주면 됨
    ```js
    import { withRouter } from 'react-router-dom';
    const Sample = ({ history }) => {
        history.push('/'); // 홈 화면으로 이동
    };
    export default withRouter(Sample);
    ```
-   버튼 컴포넌트를 Link처럼 작동시키는 두 가지 방법
    1. Button 컴포넌트에서 writeRouter를 사용
    ```js
    const Button = ({ to, history, ...rest }) => {
        const onClick = e => {
            // to가 있다면 to로 페이지 이동
            if (to) {
                history.push(to);
            }
            if (rest.onClick) {
                rest.onClick(e);
            }
        };
    };
    ```
    2. Link 컴포넌트 직접 사용 (권장)
    ```js
    const StyledLink = styled(Link)`...css`;
    const Button = props => {
        return props.to ? (
            <StyledLink {...props} cyan={props.cyan ? 1 : 0} /> // styled() 함수로 감싸서 만든 컴포넌트의 경우에는 임의 props가 필터링되지 않기 때문에
        ) : (
            <StyledButton {...props} />
        );
    };
    ```

## 리덕스

-   Ducks 패턴 사용해 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의되어 있는 리덕스 모듈
-   immer를 통해 불변성 관리
-   컨테이너 컴포넌트에서는 connect 함수 대신 useDispatch와 useSelector Hooks를 사용하여 구현
-   비동기 작업은 axios와 redux-saga 사용
-   package.json에 proxy 등록을 하면 웹팩 개발 서버가 프록시 역할을 해서 대신 요청을 하고 결과물을 응답해 줌

```json
    "proxy" : "http://localhost:4000"
```

-   로그인 상태 유지를 위해 브라우저에 내장되어 있는 localStorage를 사용

```js
    localStorage.setItem('user', JSON.stringfy(user);
```

-   index.js에서 로그인 체크를 하면 사용자가 깜빡임 현상 없이 로그인된 화면을 볼 수 있음

### 에디터 라이브러리

-   `yarn add quill`로 설치
-   일반 input태그나 textarea가 아니기 때문에 onChange와 value 값을 사용하여 상태를 관리할 수 없음/.
-   HTML 필터링은 백엔드에서 sanitize-html 라이브러리

## HTTP 헤더 조회

-   api 호출시 response로 담겨 오는 meta데이터를 dispatch할 때 같이 전달

```js
const response = yield call(request, action.payload);
yield put({
    type : SUCCESS,
    payload : response.data,
    meta : response
});
```

-   원하는 헤더 값을 action에서 받아서 사용

```js
[SUCCESS] : (state, { payload, meta : response }) => ({
    ...state,
    posts,
    lastPage : parseInt(response.header['last-page'], 10),
})
```

## 컴포넌트의 props값을 전달 전달 해야하는 경우

-   jsx를 props로 전달하여 처리할 수도 있음

```js
// 호출
actionButtons={<PostActionButtons onEdit={onEdit}>}
// 컴포넌트
const Sample = () => {
    {PostActionButtons}
}
```

## meta 태그 설정

1. `yarn add react-helmet-async` 라이브러리 설치
2. src/index.js 파일에서 HelmetProvider 컴포넌트로 App 컴포넌트 감싸기
3. meta 태그를 설정하고 싶은 곳에 Helmet 컴포넌트 사용

```js
<Helmet>
    <title>REACTERS</title>
</Helmet>
```

4. 더 깊숙한 곳에 위치한 Helmet이 우선권을 차지함

## 코드 스플리팅

-   코드 비동기 로딩을 통해 자바스크립트 함수, 객체 혹은 컴포넌트를 처음에는 불러오지 않고 필요한 시점에 불러와서 사용
-   import를 상단에서 하지 않고 import() 함수 형태로 메서드 안에서 사용하면, 파일을 따로 분리시켜서 저장함

```js
const onClick = () => {
    import('./notify').then(result => result.default()); // dynamic import 문법 웹팩에서 지원
    // default 로 내보낸 것은 default로 사용
};
```

### React.lazy와 Sespense를 통한 컴포넌트 코드 스플리팅(~ v.16.6)

-   React.lazy는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수

```js
const SplitMe = React.lazy(() => import('./SplitMe'));
```

-   Suspense는 리액트 내장 컴포넌트로 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있음

```js
import React, { Suspense } from 'react';
(...)
<Suspense fallback={<div>loading...</div>}>
    <SplitMe />
</Suspense>
```

-   https://reactjs.org/docs/code-splitting.html#reactlazy 에서 SSR 지원하게 될 수도 있으니 확인

### Loadable Components를 통한 스플리팅

-   코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리.
-   서버 사이드 렌더링을 지원함. (React.lazy와 Suspense는 아직 서버 사이드 렌더링을 지원하지 않음)
-   `yarn add @loadable/component`로 설치

```js
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'));
// 로딩 중 다른 UI를 보여 주고 싶다면 loadable을 사용하는 부분을 다음과 같이 수정
const SplitMe = loadable(() => import('./SplitMe'), { fallback : <div>loading...</div> })
<SplitMe /> // Suspense 사용할 필요 없음
```

-   컴포넌트를 미리 불러오는 방법

```js
const MouseOver = () => {
    SplitMe.preload();
};
```

## 서버 사이드 렌더링

-   사용자가 웹 서비스에 방문했을 때 서버 쪽에서 초기 렌더링을 대신해 줌

### 장점

-   검색 엔진 크롤러 봇처럼 JS가 실행되지 않는 환경에서는 페이지가 제대로 나타나지 않기 때문에 검색 엔진이 우리의 웹 앱의 페이지를 원활하게 수집할 수 있음
-   초기 렌더링 성능을 개선할 수 있음. 사용자가 비어 있는 페이지를 보며 대기하는 일이 없어짐

### 단점

-   원래 브라우저가 해야 할 일을 서버가 대신 처리하는 것이므로 서버 리소스가 사용된다는 단점이 있음
-   프로젝트의 구조가 좀 더 복잡해질 수 있고, 데이터 미리 불러오기, 코드 스플리팅과의 호환 등 고려해야 할 사항이 많아져 개발이 어려워짐
-   코드 스플리팅과의 충돌. 별도의 호환 작업 없이 두 기술을 함께 적용하면, 서버 사이드 렌더링된 결과물이 브라우저에 나타남 -> js 파일 로딩 시작 -> js가 실행되면서 아직 불러오지 않은 컴포넌트를 null로 렌더링 -> 페이지에서 코드스플리팅된 컴포넌트들이 사라짐 -> 코드 스플리팅된 컴포넌트들이 로딩된 이후 제대로 나타남
-   Loadable Components 라이브러리에서 제공하는 기능을 써서 SSR 후 필요한 파일의 경로를 추출하여 렌더링 결과에 스크립트/스타일 태그를 삽입해서 해결

### 구현하기

1. 웹팩 설정 커스터마이징해야하므로 `yarn eject` 시행
