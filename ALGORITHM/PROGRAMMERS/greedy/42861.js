function solution(n, costs) {
    let answer = 0;
    const INF = Infinity;
    const q = [];
    const isVisited = new Array(n).fill(false).map((a, i) => i);
    costs.forEach(cost => {
        const [a, b, c] = cost;
        q.push([c, a, b]);
    });

    q.sort((a, b) => a[0] - b[0]);

    while (isVisited.some(v => v !== 0) && q.length) {
        const [c, a, b] = q.shift();
        if (find(isVisited, a) !== find(isVisited, b)) {
            union(isVisited, a, b);
            answer += c;
        }
    }
    function find(parent, x) {
        if (parent[x] !== x) {
            parent[x] = find(parent, parent[x]);
        }
        return parent[x];
    }
    function union(parent, a, b) {
        a = find(parent, a);
        b = find(parent, b);
        if (a < b) {
            parent[b] = a;
        } else {
            parent[a] = b;
        }
    }

    return answer;
}

console.log(
    solution(4, [
        [0, 1, 1],
        [0, 2, 2],
        [1, 2, 5],
        [1, 3, 1],
        [2, 3, 8],
    ]),
); // 4
