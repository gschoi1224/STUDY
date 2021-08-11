const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let M = 0,
    N = 0,
    H = 0,
    h = 0; // M : 가로, N : 세로, H: 높이
let graph = [];

const dx = [-1, 1, 0, 0, 0, 0];
const dy = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];
const q = [];
let answer = 0;

rl.on('line', function (line) {
    if (M === 0 || N === 0 || H === 0) {
        [M, N, H] = line.split(' ').map(Number);
        graph = new Array(H).fill(0).map(m => []);
    } else {
        graph[h].push(line.split(' ').map(Number));
        if (graph[h].length === N) {
            h++;
        }
        if (h === H) {
            rl.close();
        }
    }
}).on('close', function () {
    for (let z = 0; z < H; z++) {
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < M; x++) {
                if (graph[z][y][x] === 1) {
                    q.push({ x, y, z });
                }
            }
        }
    }
    bfs(0);
    for (let z = 0; z < H; z++) {
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < M; x++) {
                if (graph[z][y][x] === 0) {
                    console.log(-1);
                    process.exit();
                } else if (graph[z][y][x] > 0) {
                    answer = Math.max(answer, graph[z][y][x]);
                }
            }
        }
    }
    console.log(answer === 1 ? 0 : answer - 1);
    process.exit();
});

function bfs(i) {
    while (q.length > i) {
        const { x, y, z } = q[i];
        i++;
        for (let i = 0; i < 6; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            const nz = z + dz[i];
            if (
                nx > -1 &&
                ny > -1 &&
                nz > -1 &&
                nx < M &&
                ny < N &&
                nz < H &&
                (graph[nz][ny][nx] === 0 ||
                    graph[nz][ny][nx] > graph[z][y][x] + 1)
            ) {
                graph[nz][ny][nx] = graph[z][y][x] + 1;
                q.push({ x: nx, y: ny, z: nz });
            }
        }
    }
}
