function solution(name) {
    let answer = 0;
    const n = name.length;

    const toNum = char => {
        return Math.min(
            Math.abs(char.charCodeAt() - 'A'.charCodeAt()),
            Math.abs('Z'.charCodeAt() - char.charCodeAt() + 1),
        );
    };

    for (let i = 0; i < n; i++) {
        answer += toNum(name[i]);
    }

    let move = n - 1;
    for (let i = 0; i < n; i++) {
        let next_idx = i + 1;
        while (next_idx < n && name[next_idx] == 'A') {
            next_idx += 1;
        }
        const distance = Math.min(i, n - next_idx);
        move = Math.min(move, i + n - next_idx + distance);
    }
    answer += move;
    return answer;
}

console.log(solution('JEROEN')); // 56
console.log(solution('JAN')); // 23
console.log(solution('ABAAAAAAAAABB')); // 4
