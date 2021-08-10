const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = 0;
const input = [];

rl.on('line', function (line) {
    if (N === 0) {
        N = parseInt(line);
    } else {
        input.push(line.split(''));
        if (input.length >= N) {
            rl.close();
        }
    }
}).on('close', function () {
    const visited = new Array(N).fill(0).map(a => new Array(N).fill(false));
    const answer = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j] && input[i][j] === '1') {
                cnt = 0;
                dfs(input, i, j, visited);
                answer.push(cnt);
            }
        }
    }
    console.log(answer.length);
    if (answer.length > 0) {
        3;
        answer.sort((a, b) => a - b);
        answer.forEach(a => {
            console.log(a);
        });
    } else {
        console.log(0);
    }
    process.exit();
});

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let cnt = 0;
function dfs(graph, x, y, visited) {
    visited[x][y] = true;
    cnt++;
    for (let i = 0; i < 4; i++) {
        const xx = dx[i] + x;
        const yy = dy[i] + y;
        if (
            xx > -1 &&
            yy > -1 &&
            xx < N &&
            yy < N &&
            graph[xx][yy] === '1' &&
            !visited[xx][yy]
        ) {
            dfs(graph, xx, yy, visited, cnt);
        }
    }
    return cnt;
}
