function solution(line) {
    const contacts = new Set();
    let minX, minY, maxX, maxY;
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
            const [A, B, E] = line[i];
            const [C, D, F] = line[j];

            let x = (B * F - E * D) / (A * D - B * C);
            let y = (E * C - A * F) / (A * D - B * C);
            if (Number.isInteger(x) && Number.isInteger(y)) {
                contacts.add(`${x},${y}`);
                if (!minX || minX > x) {
                    minX = x;
                }
                if (!minY || minY > y) {
                    minY = y;
                }
                if (!maxX || maxX < x) {
                    maxX = x;
                }
                if (!maxY || maxY < y) {
                    maxY = y;
                }
            }
        }
    }
    const answer = new Array(maxY - minY + 1)
        .fill(0)
        .map(_ => new Array(maxX - minX + 1).fill('.'));
    for (let contact of [...contacts]) {
        let [x, y] = contact.split(',').map(Number);
        x = x - minX;
        y = maxY - y;
        answer[y][x] = '*';
    }
    return answer.map(a => a.join(''));
}

console.log(
    solution([
        [2, -1, 4],
        [-2, -1, 4],
        [0, -1, 1],
        [5, -8, -12],
        [5, 8, 12],
    ]),
); // ["....*....", ".........", ".........", "*.......*", ".........", ".........", ".........", ".........", "*.......*"]
console.log(
    solution([
        [0, 1, -1],
        [1, 0, -1],
        [1, 0, 1],
    ]),
); // ["*.*"]
console.log(
    solution([
        [1, -1, 0],
        [2, -1, 0],
    ]),
); // ["*"]
console.log(
    solution([
        [1, -1, 0],
        [2, -1, 0],
        [4, -1, 0],
    ]),
); // ["*"]
console.log(
    solution([
        [0, 1, 0],
        [1, 0, 5],
        [1, 0, -3],
    ]),
);
