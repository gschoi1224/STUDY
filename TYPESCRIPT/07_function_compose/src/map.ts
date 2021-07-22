// @ts-nocheck
export const map = f => a => a.map(f);
// 제네릭 함수로 구현할 수 있지만 함수 조합 코드는 타입 주석을 생략해 컴파일러가 타입을 추론하게 하는 편이 이해하기 쉬움
// export const map = <T, R>(f: (T) => R) => (a: T[]): R[] => a.map(f)
