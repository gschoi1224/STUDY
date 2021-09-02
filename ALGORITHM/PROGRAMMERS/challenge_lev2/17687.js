function solution(n, t, m, p) {
    var answer = '';
    let i = 0;
    while (answer.length < t * m) {
        answer += (i++).toString(n).toUpperCase();
    }
    console.log(answer);
    return answer
        .split('')
        .filter((_, i) => i % m === p - 1)
        .slice(0, t)
        .join('');
}

console.log(solution(2, 4, 2, 1)); // "0111"
console.log(solution(16, 16, 2, 1)); // "02468ACE11111111"
console.log(solution(16, 16, 2, 2)); // "13579BDF01234567"
