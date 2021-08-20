function solution(arr1, arr2) {
    const row = arr1.length;
    const col = arr1[0].length;
    const answer = new Array(row).fill(0).map(_ => new Array(col).fill(0));
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            answer[r][c] = arr1[r][c] + arr2[r][c];
        }
    }
    return answer;
}
console.log(
    solution(
        [
            [1, 2],
            [2, 3],
        ],
        [
            [3, 4],
            [5, 6],
        ],
    ),
); // [[4,6],[7,9]]
console.log(solution([[1], [2]], [[3], [4]])); // 	[[4],[6]]
