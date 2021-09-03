function solution(dirs) {
    const direction = {
        L: { x: -1, y: 0 }, // 좌
        R: { x: 1, y: 0 }, // 우
        U: { x: 0, y: -1 }, // 상
        D: { x: 0, y: 1 }, // 하
    };
    const now = { x: 5, y: 5 };
    const isVisited = new Set();
    dirs.split('').forEach(dir => {
        const moveTo = {
            x: now.x + direction[dir].x,
            y: now.y + direction[dir].y,
        };
        if (moveTo.x > -1 && moveTo.y > -1 && moveTo.x < 11 && moveTo.y < 11) {
            switch (dir) {
                case 'R':
                    isVisited.add(`${now.x},${now.y},h`);
                    break;
                case 'L':
                    isVisited.add(`${moveTo.x},${moveTo.y},h`);
                    break;
                case 'D':
                    isVisited.add(`${moveTo.x},${moveTo.y},v`);
                    break;
                case 'U':
                    isVisited.add(`${now.x},${now.y},v`);
                    break;
            }
            now.x = moveTo.x;
            now.y = moveTo.y;
        }
    });
    return isVisited.size;
}

console.log(solution('ULURRDLLU')); // 7
console.log(solution('LULLLLLLU')); // 7
console.log(solution('LURDLUUDD')); // 5
