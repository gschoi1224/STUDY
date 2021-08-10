const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
let N = 0,
    M = 0;
const graph = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
rl.on('line', function (line) {
    if (N === 0 || M === 0) {
        [N, M] = line.split(' ').map(l => parseInt(l));
    } else {
        graph.push(line.split('').map(l => parseInt(l)));
        if (graph.length === N) {
            rl.close();
        }
    }
}).on('close', function () {
    q = [[0, 0]];
    while (q.length) {
        const [x, y] = q.shift();
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (-1 < nx && nx < N && -1 < ny && ny < M && graph[nx][ny] === 1) {
                graph[nx][ny] = Number(graph[x][y]) + 1;
                q.push([nx, ny]);
            }
        }
    }
    const answer = graph[N - 1][M - 1];
    console.log(answer);
    process.exit();
});
