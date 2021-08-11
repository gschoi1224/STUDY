const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = -1,
    K = -1;
rl.on('line', function (line) {
    [N, K] = line.split(' ').map(Number);
    q.push({ s: N, cnt: 0 });
    visited = new Array(100001).fill(false);
    rl.close();
}).on('close', function () {
    console.log(bfs());
    process.exit();
});

const q = [];
let visited = [];
function bfs() {
    let i = 0;
    while (q.length > i) {
        const { s, cnt } = q[i];
        i++;
        if (visited[s]) {
            continue;
        }
        if (s === K) {
            return cnt;
        }
        visited[s] = true;

        if (s * 2 <= 100000) {
            q.push({ s: s * 2, cnt: cnt + 1 });
        }
        if (s < 100000) {
            q.push({ s: s + 1, cnt: cnt + 1 });
        }
        if (s > 0) {
            q.push({ s: s - 1, cnt: cnt + 1 });
        }
    }
}
