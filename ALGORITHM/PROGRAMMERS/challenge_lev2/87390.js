const solution = (n, left, right) => {
    const answer = [];
    for (let i = left; i <= right; i++) {
        const x = Math.floor(i / n);
        const y = i % n;
        answer.push(Math.max(x, y) + 1);
    }
    return answer;
};

console.log(solution(3, 2, 5)); // [3, 2, 2, 3]
console.log(solution(4, 7, 14)); // [4, 3, 3, 3, 4, 4, 4, 4]
