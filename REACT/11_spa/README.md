# SPA(Single Page Application)

라우팅 : 다른 주소에 다른 화면을 보여 주는 것
리액트 라이브러리 자체에 라우팅 기능이 내장되어 있지는 않으나 브라우저의 API를 직접 사용하여 관리하거나
라이브러리를 사용하여 더욱 쉽게 구현할 수 있음
리액트 라우팅 라이브러리는 리액트 라우터, 리치 라우터, Next.js 등 여러 가지가 있음

## SPA의 단점

앱의 규모가 커지면 JS 파일이 너무 커짐
-> 코드 스플리팅(code splitting)을 사용하면 라우트별로 파일들을 나누어 트래픽과 로딩 속도를 개선할 수 있음
자바스크립트를 실행하지 않는 일반 크롤러에서는 페이지의 정보를 제대로 수집해 가지 못함
JS가 실행될 때까지 페이지가 비어 있기 때문에 자바스크립트 파일이 로딩되어 실행되는 시간 동안 흰 페이지가 나타남
-> 서버 사이드 렌더링(server-side rendering)을 통해 해결 가능

# 리액트 라우터 사용해보기

### yarn add react-router-dom

src/index.js 파일에서 react-router-dom에 내장되어 있는 BrowserRouter 라는 컴포넌트를 사용하여 감싸면 됨
이 컴포넌트는 웹 애플리케이션에 HTML5의 History APi를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고,
현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해줌

## Route 컴포넌트 사용

<Route path="/" component={Home} exact={true} />

## Link 컴포넌트 사용 - 페이지 전환 없이 현재 상태 그대로 가지고 페이지 주소 변경

<Link to="주소">내용</Link>

## Route 하나에 여러 개의 path 설정하기

- 리액트 라우터 v5부터 적용된 기능으로 이전 버전에서는 여러 개의 path에 같은 컴포넌트를 보여주고 싶다면 Route 컴포넌트를 여러 개 써야했음
- path props를 배열로 설정해주면 여러 경로에서 같은 컴포넌트를 보여 줄 수 있음

## URL 파라미터

/profile/id 와 같은 형식으로 뒷부분에 유동적인 id 값을 넣어 줄 때 해당 값을 props로 받아 와서 조회하는 방법
URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 match 라는 객체 안의 params 값을 참조함
match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어 있음
<Route path="/profile/:username" component={Profile} /> 파라미터 이름 정하기!

## URL 쿼리

쿼리는 location 객체에 들어 있는 search 값에서 조회할 수 있음
location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있음
location : {
"pathname" : "/about",
"search" : "?defail=true",
"hash": ""
}
쿼리 문자열을 객체로 변환할 때는 qs라는 라이브러리를 사용함

> yarn add qs
> qs.parse(location.search, {ignoreQueryPrefix : true // 문자열 맨 앞의 ? 생략 여부 });

## 서브 라우트

라우트 내부에 또 라우트를 정의하는 것을 의미
라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 됨
compnent 대신 render라는 props를 넣어 주면 컴포넌트 자체를 전달하는 것이 아니라 보여 주고 싶은 JSX를 넣어 줄 수 있음
따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 props를 별도로 넣어 주고 싶을 때도 사용할 수 있음
JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정됨 exact={true} 와 같은 의미

## history

history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나로,
이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있음
뒤로 가기, 로그인 후 화면 전환, 다른 페이지로 이탈하는 것을 방지할 때 사용

## withRouter

withRouter 함수는 HoC(Higher-order Component)로 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해줌
withRouter를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸 주면 됨
현재 자신을 보여 주고 있는 라우트 컴포넌트를 기준으로 math가 전달됨
라우트를 설정할 때 사용한 path props 를 기준으로 match.params 읽어옴

## Swith

여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜 줌
Switch를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있음

## NavLink

Link와 비슷하지만 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 css 클래스를 적용할 수 있는 컴포넌트
NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle 값을,
CSS 클래스를 적용할 때는 activeClassName 값을 props로 넣어 주면 됨.
