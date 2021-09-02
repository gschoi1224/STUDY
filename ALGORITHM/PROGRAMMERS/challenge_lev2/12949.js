function solution(arr1, arr2) {
    const row = arr1.length;
    const col = arr2[0].length;
    var answer = new Array(Math.max(row))
        .fill(0)
        .map(_ => new Array(col).fill(0));
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            answer[r][c] = arr1[r].reduce(
                (acc, a, i) => acc + arr2[i][c] * a,
                0,
            );
        }
    }
    return answer;
}

console.log(
    solution(
        [
            [1, 4],
            [3, 2],
            [4, 1],
        ],
        [
            [3, 3],
            [3, 3],
        ],
    ),
); // [[15, 15], [15, 15], [15, 15]]
console.log(
    solution(
        [
            [2, 3, 2],
            [4, 2, 4],
            [3, 1, 4],
        ],
        [
            [5, 4, 3],
            [2, 4, 1],
            [3, 1, 1],
        ],
    ),
); // [[22, 22, 11], [36, 28, 18], [29, 20, 14]]
