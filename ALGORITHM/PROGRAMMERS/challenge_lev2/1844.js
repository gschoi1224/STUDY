function solution(maps) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    const m = maps.length;
    const n = maps[0].length;
    const visited = maps.map(m => m.map(n => n));
    visited[0][0] = 1;
    const q = [[0, 0]];
    while (q.length) {
        const [x, y] = q.shift();
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (
                nx > -1 &&
                ny > -1 &&
                nx < maps[0].length &&
                ny < maps.length &&
                maps[ny][nx] === 1 &&
                visited[ny][nx] === 1
            ) {
                visited[ny][nx] = visited[y][x] + 1;
                q.push([nx, ny]);
            }
        }
    }
    return visited[m - 1][n - 1] <= 1 ? -1 : visited[m - 1][n - 1];
}
console.log(
    solution([
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1],
    ]),
); // 11
console.log(
    solution([
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
    ]),
); // 	-1

console.log(solution([[1, 1, 1, 1, 1]]));
