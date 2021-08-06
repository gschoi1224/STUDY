function solution(brown, yellow) {
    let answer = [];
    const total = brown + yellow;
    let width = 0,
        height = 0;

    for (let i = 3; i <= parseInt(total / 3); i++) {
        if (total % i === 0) {
            width = Math.max(i, total / i);
            height = Math.min(i, total / i);
            const y = (width - 2) * (height - 2);
            if (y === yellow) {
                answer = [width, height];
                break;
            }
        }
    }
    return answer;
}

console.log(solution(10, 2)); // [4, 3]
console.log(solution(8, 1)); // [3, 3]
console.log(solution(24, 24)); // [8, 6]
