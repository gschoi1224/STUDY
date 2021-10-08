// 합승 택시 요금
function solution(n, s, a, b, fares) {
    let answer = 0;
    const minimumFares = new Array(n + 1)
        .fill(0)
        .map(_ => new Array(n + 1).fill(100000 * n));
    fares.forEach(([a, b, c]) => {
        minimumFares[a][b] = c;
        minimumFares[b][a] = c;
    });

    for (let i = 1; i <= n; i++) {
        minimumFares[i][i] = 0;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            for (let k = 1; k <= n; k++) {
                minimumFares[i][j] = Math.min(
                    minimumFares[i][j],
                    minimumFares[i][k] + minimumFares[k][j],
                );
            }
        }
    }
    answer = minimumFares[s][a] + minimumFares[s][b];
    for (let i = 1; i <= n; i++) {
        answer = Math.min(
            answer,
            minimumFares[s][i] + minimumFares[i][a] + minimumFares[i][b],
        );
    }
    return answer;
}

console.log(
    solution(6, 4, 6, 2, [
        [4, 1, 10],
        [3, 5, 24],
        [5, 6, 2],
        [3, 1, 41],
        [5, 1, 24],
        [4, 6, 50],
        [2, 4, 66],
        [2, 3, 22],
        [1, 6, 25],
    ]),
); // 82
console.log(
    solution(7, 3, 4, 1, [
        [5, 7, 9],
        [4, 6, 4],
        [3, 6, 1],
        [3, 2, 3],
        [2, 1, 6],
    ]),
); // 14
console.log(
    solution(6, 4, 5, 6, [
        [2, 6, 6],
        [6, 3, 7],
        [4, 6, 7],
        [6, 5, 11],
        [2, 5, 12],
        [5, 3, 20],
        [2, 4, 8],
        [4, 3, 9],
    ]),
); // 18
