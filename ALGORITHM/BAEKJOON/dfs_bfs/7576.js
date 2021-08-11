const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = 0,
    M = 0;
let graph = [];
let answer = 0;
const q = [];
rl.on('line', function (line) {
    if (N === 0 || M === 0) {
        [M, N] = line.split(' ').map(Number);
    } else {
        graph.push(line.split(' ').map(Number));
        if (graph.length === N) {
            rl.close();
        }
    }
}).on('close', function () {
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
            if (graph[y][x] === 1) {
                q.push({ x, y });
            }
        }
    }
    bfs(0);
    graph.forEach(y => {
        y.forEach(x => {
            if (x === 0) {
                console.log(-1);
                process.exit();
            } else if (x > 0) {
                answer = Math.max(x - 1, answer);
            }
        });
    });
    console.log(answer === 1 ? 0 : answer);
    process.exit();
});

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(i) {
    while (q.length > i) {
        const { x, y } = q[i];
        i++;
        for (let i = 0; i < 4; i++) {
            const nx = dx[i] + x;
            const ny = dy[i] + y;
            if (
                nx > -1 &&
                ny > -1 &&
                nx < M &&
                ny < N &&
                (graph[ny][nx] === 0 || graph[ny][nx] > graph[y][x] + 1)
            ) {
                graph[ny][nx] = graph[y][x] + 1;
                q.push({ x: nx, y: ny });
            }
        }
    }
}
