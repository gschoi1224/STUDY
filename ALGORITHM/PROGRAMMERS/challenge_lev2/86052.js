function solution(grid) {
    const answer = [];
    const [V, H] = [grid.length, grid[0].length];
    const visited = new Array(V)
        .fill(false)
        .map(_ => new Array(H).fill(false).map(_ => new Array(4).fill(false)));
    const directios = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];
    const bfs = start => {
        let [x, y, dir] = start;
        let cnt = 0;
        while (true) {
            if (visited[x][y][dir]) {
                return cnt;
            }

            visited[x][y][dir] = true;
            cnt++;

            switch (grid[x][y]) {
                case 'L':
                    dir = mod(dir + 1, 4);
                    break;
                case 'R':
                    dir = mod(dir - 1, 4);
                    break;
            }
            x = mod(x + directios[dir][0], V);
            y = mod(y + directios[dir][1], H);
        }
    };
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < H; j++) {
            for (let k = 0; k < directios.length; k++) {
                const result = bfs([i, j, k]);
                if (result > 0) answer.push(result);
            }
        }
    }
    answer.sort((a, b) => a - b);
    return answer;
}

const mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

console.log(solution(['SL', 'LR'])); // [16]
console.log(solution(['S'])); // [1, 1, 1, 1]
console.log(solution(['R', 'R'])); // [4, 4]
