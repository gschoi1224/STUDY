function solution(array, commands) {
    var answer = [];
    for (const [a, b, c] of commands) {
        answer.push(array.slice(a - 1, b).sort((a, b) => a - b)[c - 1]);
    }
    return answer;
}

console.log(
    solution(
        [1, 5, 2, 6, 3, 7, 4],
        [
            [2, 5, 3],
            [4, 4, 1],
            [1, 7, 3],
        ],
    ),
); // [5, 6, 3]
