function solution(N, road, K) {
    const distance = new Array(N).fill(Infinity);
    const graph = new Array(N).fill(0).map(_ => new Array(N).fill(Infinity));
    road.forEach(r => {
        const [a, b, c] = r;
        graph[a - 1][b - 1] = Math.min(graph[a - 1][b - 1], c);
        graph[b - 1][a - 1] = Math.min(graph[b - 1][a - 1], c);
    });
    const q = new PriorityQueue([0, 0]);
    while (q.length()) {
        const [cost, now] = q.shift();
        if (distance[now] < cost) {
            continue;
        }
        graph[now].forEach((g, i) => {
            const c = cost + g;
            if (c < distance[i]) {
                distance[i] = c;
                q.push([c, i]);
            }
        });
    }
    distance[0] = 1;
    return distance.filter(d => d <= K).length;
}

class PriorityQueue {
    queue = [];
    constructor(value) {
        this.queue = [value];
    }
    push(value) {
        this.queue.push(value);
        this.queue.sort((a, b) => a[0] - b[0]);
    }
    shift() {
        return this.queue.shift();
    }
    length() {
        return this.queue.length;
    }
}
// console.log(
//     solution(
//         5,
//         [
//             [1, 2, 1],
//             [2, 3, 3],
//             [5, 2, 2],
//             [1, 4, 2],
//             [5, 3, 1],
//             [5, 4, 2],
//         ],
//         3,
//     ),
// ); // 4
console.log(
    solution(
        6,
        [
            [1, 2, 1],
            [1, 3, 2],
            [2, 3, 2],
            [3, 4, 3],
            [3, 5, 2],
            [3, 5, 3],
            [5, 6, 1],
        ],
        4,
    ),
); // 4
