const solution = n => '수박'.repeat(parseInt(n / 2)) + '수'.repeat(n % 2);

console.log(solution(3)); // '수박수'
console.log(solution(4)); // '수박수박'
