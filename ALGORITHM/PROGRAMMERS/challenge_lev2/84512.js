function solution(word) {
    const dic = ['A', 'E', 'I', 'O', 'U'];
    const mul = [781, 156, 31, 6, 1];
    return [...word].reduce(
        (acc, cur, i) => acc + mul[i] * dic.indexOf(cur) + 1,
        0,
    );
}

console.log(solution('AAAAE')); // 6
console.log(solution('AAAE')); // 10
console.log(solution('I')); // 1563
console.log(solution('EIO')); // 1189
