# 뉴스 뷰어 프로젝트

## 비동기 작업

### Promise(ES6)

```js
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생시키기
        const e = new Error('Number TooBig');
        return reject(e);
      }
      resolve(result); // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

increase(0)
  .then((number) => {
    // Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
    console.log(number); //10
    return increase(number); // Promise를 리턴하면
  })
  .then((number) => {
    // 또 .then으로 처리 가능
    cosole.log(number); //20
    return increase(number);
  })
  .catch((e) => {
    // 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
    console.log(e);
  });
```

### async/await(ES8)

```js
async function runTasks() {
  try {
    let result = await increase(0);
    result = await increase(result);
  } catch (e) {
    console.log(e);
  }
}
```

## axios로 API 호출하기

> yarn add axios

- Promise로 받기

```js
axios.get('url').then((response) => {
  setData(response.data);
});
```

- async/await으로 받기

```js
async () => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (e) {
    console.log(e);
  }
};
```

## UI 만들기

1. styled-components 설치(yarn add styled-components)
2. NewsItem 만들기

   - line-height 속성: 줄 높이를 정하는 속성으로
     - normal : 웹 브라우저에서 정한 기본값으로 보통 1.2
     - length : 길이로 줄 높이를 정함
     - number : 글자 크기의 몇 배인지로 줄 높이를 정함(글자 크기가 40px일 때 1.5로 하면 줄 높이가 60px이 되어 위 아래 10px씩 여백 생김)
     - percentage : 글자 크기의 몇 %를 줄 높이로 정함
     - initial : 기본값으로 설정
     - inherit : 부모 요소의 속성값을 상속받음
   - object-fit 속성 : 대체되는 요소의 내용(img, video, object, svg 태그 등)이 지정된 너비와 높이에 맞게 장착되는 방식을 지정. 프로필 이미지나 고정된 크기의 썸네일을 출력하는 다양한 경우처럼 제각각의 크기를 가진 오브젝트등을 넘겨받아 비율을 유지한 채로 일정한 크기로 재가공하는 경우에 유용(IE 미지원)
     - fill : 기본값. 주어진 너무와 높이에 딱 맞도록 사이즈를 조절. 이미지의 가로세로 비율은 유지되지 않음
     - contain : 가로세로 비율을 유지한 채로 사이즈가 조절되지만, 이미지와 컨테이너 간의 비율이 맞지 않는 경우엔 자리가 남게 됨
     - cover : 가로세로 비율을 유지한 채로 사이즈가 조절되며, 비율이 맞지 않더라도 이미지를 확대해 컨테이너를 완전히 채움
     - none : 아무것도 하지 않고 본래의 이미지 사이즈를 유지함. 이미지가 가운데 보여지기는 함
     - scale-down : none 또는 contain 중에 적절한 방향으로 이미지 사이즈를 조절함
   - rel 속성
     - noreferrer : 링크를 클릭했을 때 HTTP 리퍼러 헤더를 넘기지 않을 수 있음
     - nofollow : 검색 엔진이 해당 링크를 크롤링하지 않을 수 있음
     - noopener : target 속성이 \_blank인 링크를 클릭해 새 탭에서 페이지가 열리면 열린 쪽에서 자바 스크립트를 이용 window.opener 속성으로 연 쪽의 window 객체에 접근하는 것을 막아줌
   - css에서 상대적인 크기 단위
     - em : 현재 스타일 지정 요소의 font-size 값을 기준으로 지정된 배수로 변환해 표현한 크기를 의미. 예를 들어
     ```css
     div {
       font-size: 16px;
     }
     div {
       font-size: 1.5em; /* 24px */
       margin: 2em; /* 32px */
       padding: 1.25em; /* 20px */
     }
     ```
     - rem : 최상위 요소(보통 html 태그)에서 지정된 font-size의 값을 지정된 배수로 변환해 표현한 크기를 의미. 예를 들어 html태그의 font-size 값이 16px이라면 2rem은 32px을 의미
   - white-space : 스페이스와 탭, 줄바꿈, 자동줄바꿈을 어떻게 처리할지 정하는 속성

     - 스페이스와 탭 : 연속된 스페이스와 탭의 처리 방법. 병합은 1개의 공백으로 바구는 것이고, 보존은 입력된 그대로 출력하는 것
     - 줄바꿈의 처리방법. 병합은 1개의 공백으로 바꾸는 것이고, 보존은 입력된 그대로 출력하는 것
     - 자동 줄바꿈 : 내용이 영역의 크기를 벗어날 때 처리방법. O는 자동으로 줄바꿈하여 영역 내에 내용을 표시하는 것이고, X는 영역을 벗어나더라도 입력된 대로 출력하는 것
     <table border="1">
     <tr>
     <th></th>
     <th>스페이스와 탭</th>
     <th>줄바꿈</th>
     <th>자동 줄바꿈</th>
     </tr>
     <tr>
     <th>normal</th>
     <td>병합</td>
     <td>병합</td>
     <td>O</td>
     </tr>
     <tr>
     <th>nowrap</th>
     <td>병합</td>
     <td>병합</td>
     <td>X</td>
     </tr>
     <tr>
     <th>pre</th>
     <td>보존</td>
     <td>보존</td>
     <td>X</td>
     </tr>
     <th>pre-wrap</th>
     <td>보존</td>
     <td>보존</td>
     <td>O</td>
     <tr>
     <th>pre-line</th>
     <td>병합</td>
     <td>보존</td>
     <td>O</td>
     </tr>
     </table>

3. NewsList 만들기

   - box-sizing 속성 : CSS 박스 모델의 기본값에서 지정한 너비와 높이는 요소의 컨텐츠 박스 크기에만 적용됨. 요소에 테두리나 안쪽 여백이 있으면 너비와 높이에 더해서 화면에 그림. 따라서 원하는 크기를 얻으려면 테두리나 안쪽 여백을 고려해야 함.
     - content-box : 기본 CSS 박스 크기 결정법을 사용. 요소의 너비를 100px로 설정하면 콘텐츠 영역이 100px 너비를 가지고 테두리와 안족 여백은 이에 더해짐
     - border-box : 테두리와 안쪽 여백의 크기도 요소의 크기로 고려함. 너비를 100px로 설정하고 테두리와 안쪽 여백을 추가하면, 콘텐츠 영역이 줄어들어 총 너비 100px을 유지함

4. 데이터 연동하기

   - 컴포넌트가 화면에 보이는 시점에 APi를 요청 (useEffect의 두 번째 인자로 빈 배열을 넣으면 처음 렌더링될 때만 실행)
   - **useEffect에서 반환해야 하는 값을 뒷정리 함수이기 때문에 useEffect 내부에서 async/await을 사용하고 싶다면 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해 주아야 함**
   - 데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때 꼭 !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 함. 이 작업을 하지 않으면 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생!

5. 카테고리 기능 구현하기

   - 배열 안에 name과 text 값이 들어가 있는 객체들을 넣어 주어서 한글로 된 카테고리와 실제 카테고리 값을 연결시켜 줌
   - App.js에서 category 상태를 useState로 관리
   - category 값을 업데이트하는 onSelect라는 함수도 만들어 줌
   - category와 onSelect 함수를 Categories 컴포넌트에게 props로 전달해 줌(category 값을 NewsList 컴포넌트에게도 전달해 주어야 함)
   - Categories에서는 props로 전달받은 onSelect를 각 Category 컴포넌트의 onClick으로 설정해 주고, 현재 선택된 카테고리 값에 따라 다른 스타일을 적용

   ```js
   const Category = styled.div`
       ${props => props.active && css`
           /* 활성화되었을 때 원하는 스타일 */
       `}
   `;

   <Category active={category===c.name}>
   ```

   - 만약 클래스형 컴포넌트로 만들게 된다면 componentDidMount와 componentDidUpdate에서 요청을 시작하도록 설정해 주여야 하지만 함수형 컴포넌트라면 useEffect 한 번으로 컴포넌트가 맨 처음 렌더링될 때, 그리고 category 값이 바뀔 때 요청하도록 설정 가능

6. 리액트 라우터 적용하기
   - 리액트 라우터 설치하기 (yarn add react-router-dom)
   - index.js에서 리액트 라우터 적용하기
   ```js
       ...
       import ReactDOM from 'react-dom';
       import {BrowserRouter} from 'react-router-dom';
       ReactDOM.render(
           <BrowserRouter>
               <App />
           </BrowserRouter>
           document.getElementById('root');
       );
   ```
   - NewsPage 생성
     - src 디렉터리에 pages 라는 디렉터리를 생성하고, 그 안에 NewsPage.js 파일을 만들기
     - 현재 선택된 category 값을 URL 파라미터를 통해 사용할 것이므로 Categories 컴포넌트에서 현재 선택된 카테고리 값을 알려 줄 필요도 없고, onSelect 함수를 따로 전달해 줄 필요도 없음
   - App.js 수정
     - path에 /:category? 와 같은 형태로 맨 뒤에 물음표 문자가 들어있는데 이는 category값이 선택적이라는 의미
   - Categories에서 NavLink 사용하기
     - Categories에서 기존의 onSelect 함수를 호출하여 카테고리를 선택하고, 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체
     - _div, a, button, input처럼 일반 HTML 요소가 아닌 특정 컴포넌트에 styled-components를 사용할 때는 styled(컴포넌트이름)``과 같은 형식을 사용_
       - NavLink로 만들어진 Category 컴포넌트에 to 값은 '/카테고리이름'으로 설정해 줌
       - 카테고리 중에서 전체보기의 경우는 예외적으로 '/all' 대신에 '/'로 설정
       - to 값이 '/'를 가리키고 있을 때는 exact 값을 true로 해 주어야 함. 이 값을 설정하지 않으면 다른 카테고리가 선택되었을 때도 전체보기 링크에 active 스타일이 적용되는 오류가 발생
7. 커스텀 Hook 만들기
   - /src/lib 폴더 아래에 작성
   - Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며 usePromise의 의존 배열 deps를 파라미터로 받음
   - 파라미터로 받아 온 deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정됨(ESLint 경고는 규칙 무시하는 주석으로 처리)

### 정리

주의할 점 : useEffect에 등록하는 함수는 async로 작성하면 안 된다!
