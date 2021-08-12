function solution(n) {
    const max = new Array(n)
        .fill(0)
        .map((a, i) => i + 1)
        .reduce((acc, cur) => acc + cur);
    const answer = new Array(n).fill(0).map((a, i) => {
        return new Array(i + 1).fill(-1);
    });
    let i = 0,
        j = 0,
        k = 1;
    answer[0][0] = 1;
    while (k < max) {
        while (i + 1 < n && answer[i + 1][j] < 0) {
            answer[++i][j] = ++k;
        }
        while (j + 1 < n && answer[i][j + 1] < 0) {
            answer[i][++j] = ++k;
        }
        while (i - 1 > 0 && answer[i - 1][j - 1] < 0) {
            answer[--i][--j] = ++k;
        }
    }
    k = 0;
    return answer.reduce((acc, cur) => [...acc, ...cur]);
}

console.log(solution(4));
