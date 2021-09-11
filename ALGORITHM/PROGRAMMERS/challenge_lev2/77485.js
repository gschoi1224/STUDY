function solution(rows, columns, queries) {
    var answer = [];
    let num = 1;
    const origin = new Array(rows)
        .fill(0)
        .map(_ => new Array(columns).fill(0).map(_ => num++));
    for (let i = 0; i < queries.length; i++) {
        const [startX, startY, endX, endY] = queries[i];
        let MIN = Infinity;
        const q = [];
        let row = startX - 1;
        let col = startY - 1;
        while (col < endY - 1) {
            MIN = Math.min(origin[row][col], MIN);
            q.push(origin[row][col++]);
        }
        while (row < endX - 1) {
            MIN = Math.min(origin[row][col], MIN);
            q.push(origin[row++][col]);
        }
        while (col > startY - 1) {
            MIN = Math.min(origin[row][col], MIN);
            q.push(origin[row][col--]);
        }
        while (row > startX - 1) {
            MIN = Math.min(origin[row][col], MIN);
            q.push(origin[row--][col]);
        }
        const last = q.pop();
        q.splice(0, 0, last);
        while (col < endY - 1) {
            origin[row][col++] = q.shift();
        }
        while (row < endX - 1) {
            origin[row++][col] = q.shift();
        }
        while (col > startY - 1) {
            origin[row][col--] = q.shift();
        }
        while (row > startX - 1) {
            origin[row--][col] = q.shift();
        }
        answer.push(MIN);
    }
    return answer;
}

console.log(
    solution(6, 6, [
        [2, 2, 5, 4],
        [3, 3, 6, 6],
        [5, 1, 6, 3],
    ]),
); // [8, 10, 25];
console.log(
    solution(3, 3, [
        [1, 1, 2, 2],
        [1, 2, 2, 3],
        [2, 1, 3, 2],
        [2, 2, 3, 3],
    ]),
); // 	[1, 1, 5, 3]
console.log(solution(100, 97, [[1, 1, 100, 97]])); // 	[1]
