function solution(progresses, speeds) {
    let q = [];
    for (let i = 0; i < progresses.length; i++) {
        if (
            q.length === 0 ||
            Math.ceil((100 - progresses[i]) / speeds[i]) > q[q.length - 1][1]
        ) {
            q.push([1, Math.ceil((100 - progresses[i]) / speeds[i])]);
        } else {
            q[q.length - 1][0] += 1;
        }
    }
    return q.map(e => e[0]);
}

console.log(solution([93, 30, 55], [1, 30, 5])); // [2, 1]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); // [1, 3, 2]
