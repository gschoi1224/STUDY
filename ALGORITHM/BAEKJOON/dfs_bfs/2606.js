let n = -1,
    m = -1;
const input = [];
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on('line', function (line) {
    if (n === -1) {
        n = Number(line);
    } else if (m === -1) {
        m = Number(line);
    } else {
        if (n === 0 || m === 0) {
            console.log(0);
            process.exit();
        }
        input.push(
            line
                .split(' ')
                .map(l => Number(l))
                .sort(),
        );
        if (input.length >= m) {
            rl.close();
        }
    }
}).on('close', function () {
    input.sort((a, b) => {
        if (b[0] !== a[0]) {
            return a[0] - b[0];
        } else if (b[1] !== a[1]) {
            return a[1] - b[1];
        } else {
            return 0;
        }
    });
    console.log(
        bfs(input, new Array(n + 1).fill(false), 1).filter(
            (v, i) => !!v && i > 1,
        ).length,
    );
});

const bfs = (graph, visited, v) => {
    q = [v];
    visited[v] = true;
    while (q.length > 0) {
        const now = q.shift();
        graph.forEach(g => {
            if (g[0] === now && !visited[g[1]]) {
                visited[g[1]] = true;
                q.push(g[1]);
            } else if (g[1] === now && !visited[g[0]]) {
                visited[g[0]] = true;
                q.push(g[0]);
            }
        });
    }
    return visited;
};
