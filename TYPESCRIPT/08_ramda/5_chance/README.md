# chance 패키지

-   그럴듯한 가짜 데이터를 만들어주는 라이브러리

## ICoordinates 타입 객체

-   위도와 경도를 속성으로 하는 좌표를 표현하는 객체 타입
-   [ICoordinates.ts](./src/model/coordinates/ICoordinates.ts) : 객체를 타입으로 표현
-   [makeICoordinates.ts](./src/model/coordinates/makeICoordinates.ts) : 객체를 쉽게 만들어 주는 함수 구현
-   [makeRandomICoordinates.ts](./src/model/coordinates/makeRandomICoordinates.ts) : chance 패키지를 사용해 랜덤 객체 생성
-   [index.ts](./src/model/coordinates/index.ts) : 대표로 export

## ILocation 타입 객체

-   ICoordinates 타입 속성을 포함하는 타입 객체
-   country만 필수 속성이고 나머지는 모두 생략할 수 있는 선택 속성으로 구현
-   [ILocation.ts](./src/model/location/ILocation.ts): 객체를 타입으로 표현
-   [makeILocation.ts](./src/model/location/makeILocation.ts): ILocation 타입 객체를 생성하는 함수
-   [makeRandomILocation.ts](./src/model/location/makeRandomILocation.ts): chance 패키지를 사용해 그럴듯한 객체 생성
-   [index.ts](./src/model/location/index.ts): 대표로 export

## IPerson 타입 객체

-   name과 age 속성 외에는 모두 선택 속성으로 구현 (R.sortBy, R.sortWith는 선택 속성을 대상으로는 동작하지 않음)
-   [IPerson.ts](./src/model/person/IPerson.ts): 객체를 타입으로 표현
-   [makeIPerson.ts](./src/model/person/makeIPerson.ts): IPerson타입 객체를 생성하는 함수
-   [makeRandomIPerson](./src/model/person/makeRandomIPerson.ts): chance 패키지를 사용해 IPerson 속성값을 랜덤하게 생성
-   [index.ts](./src/model/person/index.ts): 대표로 export
