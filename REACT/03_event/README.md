# 이벤트

사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것

## 주의 사항

- 이벤트 이름은 카멜 표기법으로 작성해야함.
- 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 객체를 전달함
- DOM 요소에만 이벤트를 설정할 수 있음. (직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음)
- 이렇게 하면 그냥 이름이 onClick인 props를 MyComponent에게 전달해 줄 뿐

```javascript
<MyComponent onClick={doSomething} />
```

## 메서드 바인딩

- 함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져버림.
- 임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩하는 작업이 필요함 만약 바인딩하지 않는 경우라면 this가 undefined를 가리키게 됨.

### SyntheticEvent(e)

```javascript
onEvent = (e) => {
  console.log(e);
};
```

- 여기서 e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체로 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 됨
- SyntheticEvent는 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 참조할 수 없음
- 만약 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist() 함수를 호출해 주어야 함

### Property Initializer Syntax를 이용한 메서드 작성

- 메서드 바인딩은 새성자 메서드에서 하는 것이 정석이지만 새 메서드를 만들 때마다 constructor도 수정해야 해서 불편함
- 바벨의 transform-class-properties 문법을 사용하여 간단히 화살표 함수 형태로 메서드를 정의할 수 있음
