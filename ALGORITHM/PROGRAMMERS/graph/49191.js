function solution(n, results) {
    const range = [...Array(n).keys()].map(e => e + 1);
    const wins = {};
    const loses = {};
    range.map(k => {
        wins[k] = new Set([]);
        loses[k] = new Set([]);
    });
    results.map(val => {
        const [win, lose] = val;
        wins[win].add(lose);
        loses[lose].add(win);
    });
    range.map(i => {
        for (const winner of loses[i]) {
            // i 에게 이긴 사람들은 i에게 진 사람들에게 이긴것과 같음
            for (const loser of wins[i]) {
                //
                wins[winner].add(loser);
                loses[loser].add(winner);
            }
        }
        for (const loser of wins[i]) {
            // i 에게 진 사람들은 i에게 이긴 사람들에게도 진 것과 같음
            for (const winner of loses[i]) {
                wins[winner].add(loser);
                loses[loser].add(winner);
            }
        }
    });
    let answer = 0;
    for (let i = 1; i <= n; i++) {
        if (wins[i].size + loses[i].size === n - 1) {
            answer++;
        }
    }
    return answer;
}

console.log(
    solution(5, [
        [4, 3],
        [4, 2],
        [3, 2],
        [1, 2],
        [2, 5],
    ]),
); // 2
