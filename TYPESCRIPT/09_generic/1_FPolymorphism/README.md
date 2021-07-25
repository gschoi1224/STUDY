# F-바운드 다형성

-   this 키워드가 타입으로 사용될 때 객체지향 언어에서 의미하는 다형성의 효과가 나는데 일반적인 다형성과 구분하기 위해 this 타입으로 인한 다형성을 `F-바운드 다형성`이라고 함

## F-바운드 타입

-   자신을 구현하거나 상속하는 서브타입을 포함하는 타입
-   [일반 타입](./src/interfaces/ValueProvider.ts)
-   [내가 아닌 나를 상속하는 타입을 반환하는 F-바운드 타입](./src/interfaces/IAddable.ts)
-   [메서드의 반환 타입이 this인 F-바운드 타입](./src/interfaces/IMultiplyable.ts)
