# 람다 라이브러리

## 람다 라이브러리 특징

-   타입스크립트 언어와 100% 호환
-   compose와 pipe 함수 제공
-   자동 커리 기능 제공
-   포인트가 없는 고차 도움 함수 제공
-   조합 논리 함수 일부 제공
-   하스켈 렌즈 라이브러리 기능 일부 제공
-   자바스크립트 표준 모나드 규격과 호환

## 도움 함수들의 문서

-   [함수를 알파벳 순서로 분류](https://ramdajs.com/docs/)
-   [함수를 기능 위주로 분류](https://devdocs.io/ramda/)

## 람다 패키지 구성

-   함수(function): R.compose, R.pipe, R.curry 등
-   리스트(list): 배열을 대상으로 하는 R.map, R.filter, R.reduce 등
-   로직(logic): R.not, R.or, R.cond 등 불리언 로직 관련 함수
-   수학(math): R.add, R.subtract, R.multiply, R.divide 등
-   객체(object): R.prop, R.lens 등 객체와 렌즈 관련 함수
-   관계(relation): R.lt, R.lte, R.gt, R.gte 등 두 값의 관계를 파악하게 하는 함수
-   문자열(string): R.match, R.replace, R.split 등 문자열을 대상으로 정규식 등을 할 수 있게 하는 함수
-   타입(type): R.is, RisNil, R.type 등 대상의 타입을 파악하게 하는 함수

## 실습 프로젝트 만들기

> npm init --y
> npm i -D typescript ts-node @types/node
> mkdir src

> npm i -S ramda
> npm i -D @types/ramda

> npm i -S chance
> npm i -D @types/chance

> yarn tsc --init

-   ts.config 수정

```json
"paths": {"*" : ["node_modules/*"]},
"moduleResolution": "node",
"noImplicitAny": false, // any 타입을 완전히 자바스크립트적으로 해석해야 하므로
"downlevelIteration": true,
"outDir": "dist",
"sourceMap": true
```

## ramda 패키지 불러오기

-   ramda 패키지를 불러와서 R이라는 심벌로 사용

```ts
import * as R from 'ramda';
```

-   애플리케이션을 개발할 때는 R.range 처럼 사용하지만 개발이 끝난 코드는 `import {range} from 'ramda'` 처럼 배포 크기를 줄여주는 것이 좋음
