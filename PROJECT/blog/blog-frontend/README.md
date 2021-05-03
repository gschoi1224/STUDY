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
