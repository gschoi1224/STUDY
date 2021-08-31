const solution = board => {
    var answer = 0;
    const width = board[0].length;
    const height = board.length;
    if (width < 2 || height < 2) return 1;
    for (let x = 1; x < height; x++) {
        for (let y = 1; y < width; y++) {
            if (board[x][y] > 0) {
                board[x][y] =
                    Math.min(
                        board[x - 1][y - 1],
                        board[x - 1][y],
                        board[x][y - 1],
                    ) + 1;
                answer = Math.max(board[x][y], answer);
            }
        }
    }
    return answer === 0 ? 0 : answer * answer;
};

console.log(
    solution([
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
    ]),
); // 9
console.log(
    solution([
        [0, 0, 1, 1],
        [1, 1, 1, 1],
    ]),
); // 4
