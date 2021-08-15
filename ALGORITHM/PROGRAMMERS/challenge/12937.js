const solution = num => ['Even', 'Odd'][Math.abs(num % 2)];
console.log(solution(3)); // 'Odd'
console.log(solution(4)); // 'Even'
console.log(solution(2415125123)); // 'Even'
