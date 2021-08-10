const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
let T = 0,
    M = 0,
    N = 0,
    K = 0,
    tc = 0;
let graph = [];
let input = [];
const answer = [];
let visited = [];

rl.on('line', function (line) {
    if (T === 0) {
        T = parseInt(line);
    } else if (K === 0) {
        input = [];
        graph = [];
        [M, N, K] = line.split(' ').map(l => parseInt(l));
    } else {
        // input 처리
        K--;
        input.push(line.split(' ').map(l => parseInt(l)));
        if (K === 0) {
            tc++;
            graph = new Array(N).fill(0).map(a => new Array(M).fill(0));
            for ([y, x] of input) {
                graph[x][y] = 1;
            }
            visited = new Array(N).fill(0).map(a => new Array(M).fill(false));
            let ans = 0;
            for (let y = 0; y < N; y++) {
                for (let x = 0; x < M; x++) {
                    if (!visited[y][x] && graph[y][x] === 1) {
                        ans++;
                        bfs(graph, y, x, visited);
                    }
                }
            }
            answer.push(ans);
        }
        if (0 === K && T === tc) {
            rl.close();
        }
    }
}).on('close', function () {
    if (answer.length > 0) {
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

const bfs = (graph, y, x, visited) => {
    visited[y][x] = true;
    for (let i = 0; i < 4; i++) {
        const xx = dx[i] + x;
        const yy = dy[i] + y;
        if (
            xx > -1 &&
            yy > -1 &&
            xx < M &&
            yy < N &&
            graph[yy][xx] === 1 &&
            !visited[yy][xx]
        ) {
            bfs(graph, yy, xx, visited);
        }
    }
};
