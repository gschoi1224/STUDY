function solution(places) {
    var answer = [];
    places.forEach(place => {
        let result = 1;
        xloop: for (let x = 0; x < 5; x++) {
            yloop: for (let y = 0; y < 5; y++) {
                if (place[x][y] !== 'P') {
                    // 파티션이거나 공석일 경우
                    continue yloop;
                }
                if (
                    (x > 0 && place[x - 1][y] === 'P') ||
                    (x > 1 &&
                        place[x - 2][y] === 'P' &&
                        place[x - 1][y] !== 'X')
                ) {
                    // 왼쪽 옆자리에 사람 있으면
                    result = 0;
                    break xloop;
                }
                if (
                    (y > 0 && place[x][y - 1] === 'P') ||
                    (y > 1 &&
                        place[x][y - 2] === 'P' &&
                        place[x][y - 1] !== 'X')
                ) {
                    // 위에 사람 있으면
                    result = 0;
                    break xloop;
                }
                if (
                    x > 0 &&
                    y > 0 &&
                    place[x - 1][y - 1] === 'P' &&
                    (place[x - 1][y] !== 'X' || place[x][y - 1] !== 'X')
                ) {
                    // 대각선 왼쪽 위에 사람이 있고 중간에 공석이 있는 경우
                    result = 0;
                    break xloop;
                }
                if (
                    x < 4 &&
                    y > 0 &&
                    place[x + 1][y - 1] === 'P' &&
                    (place[x + 1][y] !== 'X' || place[x][y - 1] !== 'X')
                ) {
                    // 대각선 왼쪽 아래에 사람이 있고 중간에 공석이 있는 경우
                    result = 0;
                    break xloop;
                }
                if (
                    x > 0 &&
                    y < 4 &&
                    place[x - 1][y + 1] === 'P' &&
                    (place[x - 1][y] !== 'X' || place[x][y + 1] !== 'X')
                ) {
                    // 대각선 오른쪽 위에 사람이 있고 중간에 공석이 있는 경우
                    result = 0;
                    break xloop;
                }
            }
        }
        answer.push(result);
    });
    return answer;
}

console.log(
    solution([
        ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
        ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
        ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
        ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
        ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
    ]),
); // [1, 0, 1, 1, 1]

console.log(solution([['PXOOO', 'XOXOX', 'OOPXP', 'OOXPO', 'OOOOO']]));
