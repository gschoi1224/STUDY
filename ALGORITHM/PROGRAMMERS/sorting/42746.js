function solution(numbers) {
    numbers.sort((a, b) => {
        const ab = String(a) + String(b);
        const ba = String(b) + String(a);
        if (Number(ab) < Number(ba)) {
            return 1;
        } else {
            return -1;
        }
    });
    let answer = numbers.reduce((acc, cur) => acc.concat(cur), '');
    return Number(answer) === 0 ? '0' : answer;
}
console.log(solution([6, 10, 2])); // "6210"
console.log(solution([3, 30, 34, 5, 9])); // "9534330"
console.log(solution([0, 0, 0, 0])); // "70000"
