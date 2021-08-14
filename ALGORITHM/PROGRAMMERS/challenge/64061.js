function solution(board, moves) {
    var answer = 0;
    const basket = [];
    moves.forEach(m => {
        let pick = 0;
        while (board[pick][m - 1] === 0 && pick < board.length - 1) {
            pick++;
        }
        if (basket.length && basket[basket.length - 1] === board[pick][m - 1]) {
            // 터짐
            answer += 2;
            basket.pop();
            board[pick][m - 1] = 0;
        } else if (board[pick][m - 1] !== 0) {
            basket.push(board[pick][m - 1]);
            board[pick][m - 1] = 0;
        }
    });
    return answer;
}
console.log(
    solution(
        [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 3],
            [0, 2, 5, 0, 1],
            [4, 2, 4, 4, 2],
            [3, 5, 1, 3, 1],
        ],
        [1, 5, 3, 5, 1, 2, 1, 4],
    ),
); // 4
