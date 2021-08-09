function solution(n, computers) {
    const parent = new Array(n);
    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            if (computers[i][k] === 1) {
                union(i, k);
            }
        }
    }
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    function union(a, b) {
        a = find(a);
        b = find(b);
        if (a > b) {
            parent[a] = b;
        } else {
            parent[b] = a;
        }
    }
    let answer = 0;
    const visited = [];
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        answer++;
        for (let j = i + 1; j < n; j++) {
            if (find(i) === find(j)) visited[j] = true;
        }
    }
    return answer;
}

console.log(
    solution(3, [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1],
    ]),
); // 2
console.log(
    solution(3, [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1],
    ]),
); // 1
console.log(
    solution(3, [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]),
); // 3
