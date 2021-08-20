const solution = n => {
    const numbers = ['4', '1', '2'];
    let answer = '';
    while (n) {
        answer = numbers[n % 3] + answer;
        n = parseInt(n / 3) - (n % 3 === 0);
    }
    return answer;
};

console.log(solution(1)); // 1
console.log(solution(2)); // 2
console.log(solution(3)); // 4
console.log(solution(4)); // 11
console.log(solution(5)); // 12
console.log(solution(6)); // 14
console.log(solution(7)); // 21
console.log(solution(8)); // 22
console.log(solution(9)); // 24
console.log(solution(10)); // 41
console.log(solution(11)); // 42
console.log(solution(12)); // 44
console.log(solution(13)); // 111
console.log(solution(14)); // 112
console.log(solution(15)); // 114
console.log(solution(16)); // 121
console.log(solution(17)); // 122
console.log(solution(18)); // 124
console.log(solution(19)); // 141
console.log(solution(20)); // 142
console.log(solution(21)); // 211
