function solution(lottos, win_nums) {
    let same = 0;
    const zero = lottos.filter(n => n === 0).length;
    win_nums.forEach(n => {
        if (lottos.indexOf(n) > -1) same++;
    });
    console.log(zero, same);
    return [
        7 - same - zero > 6 ? 6 : 7 - same - zero,
        7 - same > 6 ? 6 : 7 - same,
    ];
}

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19])); // [3, 5]
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25])); // [1, 6]
console.log(solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35])); // [1, 1]
console.log(solution([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12])); // [6, 6]
