// @ts-nocheck

import * as R from 'ramda';

type StringToStringFunc = (string) => string;
export const toCamelCase = (delim: string): StringToStringFunc => {
    const makeFirstToCapital = (word: string) => {
        const characters = word.split('');
        return characters
            .map((c, index) => (index === 0 ? c.toUpperCase() : c))
            .join('');
    };

    // R.map의 콜백 함수에 index 매개변수 제공
    const indexedMap = R.addIndex(R.map);
    return R.pipe(
        R.trim, // 앞뒤 공배 제거
        R.split(delim), // delim 문자열을 구분자로 배열로 전환
        R.map(R.toLower), // 배열에 있는 모든 문자열을 소문자로 전환
        indexedMap(
            (value: string, index: number): string =>
                index > 0 ? makeFirstToCapital(value) : value, // 두 번째 문자열부터 첫 문자만 대문자로 전환
        ),
        R.join(''), // 배열을 다시 문자열로 전환
    ) as StringToStringFunc;
};
