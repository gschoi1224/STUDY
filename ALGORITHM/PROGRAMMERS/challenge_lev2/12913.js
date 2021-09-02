function solution(land) {
    for (let x = 1; x < land.length; x++) {
        for (let y = 0; y < land[0].length; y++) {
            land[x][y] += Math.max(...land[x - 1].filter((_, i) => i !== y));
        }
    }
    return Math.max(...land[land.length - 1]);
}

console.log(
    solution([
        [1, 2, 3, 5],
        [5, 6, 7, 8],
        [4, 3, 2, 1],
    ]),
); // 16
