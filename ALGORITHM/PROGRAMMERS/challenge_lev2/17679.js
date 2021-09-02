function solution(m, n, board) {
    var answer = 0;
    let isNone = false;
    let delList = [];
    let rotatedBoard = new Array(n)
        .fill(0)
        .map((_, x) => new Array(m).fill(0).map((_, y) => board[m - 1 - y][x]));
    const eliminate = (x, y) => {
        const now = rotatedBoard[x][y];
        if (
            rotatedBoard[x][y + 1] === now &&
            rotatedBoard[x + 1][y] === now &&
            rotatedBoard[x + 1][y + 1] === now
        ) {
            delList.add([x, y].join(','));
            delList.add([x + 1, y].join(','));
            delList.add([x, y + 1].join(','));
            delList.add([x + 1, y + 1].join(','));
        }
    };
    while (!isNone && rotatedBoard.length && answer < m * n) {
        delList = new Set();
        for (let x = 0; x < n - 1; x++) {
            for (let y = 0; y < m - 1; y++) {
                if (rotatedBoard[x].length > y) eliminate(x, y);
            }
        }
        if (delList.size === 0) isNone = true;
        else {
            [...delList].forEach(del => {
                const [x, y] = del.split(',');
                delete rotatedBoard[x][y];
                answer++;
            });
            rotatedBoard = rotatedBoard.map(board => board.filter(b => b));
        }
    }

    return answer;
}

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'])); //  14
console.log(
    solution(6, 6, [
        'TTTANT',
        'RRFACC',
        'RRRFCC',
        'TRRRAA',
        'TTMMMF',
        'TMMTTJ',
    ]),
); // 15
