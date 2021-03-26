# 컴포넌트 반복

## 자바스크립트 배열의 map() 함수

```javascript
arr.map(callback, [this.Arg]);
```

- callback : 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지
  - currentValue : 현재 처리하고 있는 요소
  - index : 현재 처리하고 있는 요소의 index 값
  - array : 현재 처리하고 있는 원본 배열
- thisArg(선택 항목) : callback 함수 내부에서 사용할 this 레퍼런스
- 예)

  ```javascript
  const numbers = [1, 2, 3, 4, 5];

  const processed = numbers.map((num) => num * num);

  console.log(processed); // [1, 4, 9, 16, 25]
  ```

## 데이터 배열을 컴포넌트 배열로 변환하기

- 문자열로 구성된 배열을 선언하고 그 배열 값을 사용하여 `<li>...</li>` JSX 코드로 된 배열을 새로 생성한 후 배열에 담기

```javascript
const names = ["눈사람", "얼음", "눈", "바람"];
const nameList = names.map((name) => <li>{name}</li>);
return <ul>{nameList}</ul>;
```

## **key**

- 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용함
- key 값을 설정할 때는 map 함수의 인자로 전달되는 하뭇 내부에서 컴포넌트 props를 설정하듯이 설정하면 됨
- **key 값은 항상 유일해야 함**

```javascript
const nameList = names.map((name, index) => <li key={index}>{name}</li>);
return <ul>{nameList}</ul>;
```
