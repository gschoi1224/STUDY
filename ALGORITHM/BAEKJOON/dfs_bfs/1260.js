const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m, v] = input[0].split(' ').map(v => +v);
input.shift();
let graph;
let visited;
let dfsResult = '';
let bfsResult = '';
const dfs = start => {
    visited[start] = 1;
    dfsResult += start + ' ';
    for (let i = 1; i <= n; i++) {
        if (!visited[i] && graph[start][i] === 1) {
            dfs(i);
        }
    }
};
const bfs = start => {
    let queue = [start];
    while (queue.length > 0) {
        const v = queue.pop();
        visited[v] = 1;
        bfsResult += v + ' ';
        for (let k = 1; k <= n; k++) {
            if (!visited[k] && graph[v][k] === 1) {
                visited[k] = 1;
                queue.unshift(k);
            }
        }
    }
};

visited = Array(n).fill(0);
graph = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
for (let i = 0; i < m; i++) {
    const [a, b] = input[i].split(' ');
    graph[a][b] = 1;
    graph[b][a] = 1;
}
dfs(v);

visited = Array(n).fill(0);
bfs(v);
console.log(dfsResult);
console.log(bfsResult);
