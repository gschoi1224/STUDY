# Next.js

-   서버 사이드 렌더링을 편하게 해주는 프레임워크
-   코드 스플리팅도 쉬움

## 시작

-   `yarn create next-app [이름]`으로 프로젝트 만들기
-   `yarn dev`하면 개발 서버 실행됨

## 라우팅

-   /pages 디렉터리에 있는 js 파일과 url이 자동으로 매핑됨
-   <Link href='/sample'> 하면 /pages/sample.js
-   <Link href='/sample?name=user' as='/sample/user'> as에 쓴 모양으로 보이게 만들 수 있음

## useRouter

-   useRouter를 사용하면 파라미터, 쿼리 등 들어있는 url 객체를 가져올 수 있음

```js
import { useRouter } from 'next/router';
const App = () => {
    const router = useRouter();
    console.log(router);
};
```

## API 사용하기

-   클래스형 컴포넌트에 getInitialProps 라는 메소드를 사용

```js
class Sample extends React.Component {
    static aysnc getInitialProps ({ req }) {    // 링크 타고 들어가면 req.from이 client, 직접 주소 치고 들어가면 req.from이 server
        const response = await axios.get(url);
        return {
            data : response.data
        }
    }

    render() {
        const { data } = this.props;    // getInitialProps에서 return된 값을 render 함수에서 사용 가능
    }
}
```

## prefetch

-   Link 컴포넌트를 렌더링할 때 <Link prefetch href=''> 하면 데이터를 먼저 불러오느 다음에 라우팅을 시작

## Head

-   react-helmet 같은 것

```js
import Head from 'next/head';
const Index = () => {
    return (
        <Head>
            <title>제목</title>
        </Head>
    );
};
```

-   여러 페이지에서 공통으로 사용하는 헤더는 pages/\_document.js 파일에
