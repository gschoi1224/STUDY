class PriorityQueue {
    constructor() {
        this.list = [];
    }
    push(val) {
        this.list.push(val);
        this.list.sort((a, b) => a[0] - b[0]);
    }
    shift() {
        return this.list.shift();
    }
}

function solution(jobs) {
    const length = jobs.length;
    var answer = 0;
    jobs.sort((a, b) => a[0] - b[0]);
    const queue = new PriorityQueue();
    let time = 0;
    while (jobs.length || queue.list.length) {
        const possible = [];
        while (jobs.length) {
            if (jobs[0][0] <= time) {
                const job = jobs.shift();
                possible.push(job);
            } else {
                break;
            }
        }
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i][0] <= time) {
                possible.push(jobs[i]);
            } else {
                break;
            }
        }
        if (possible.length) {
            possible.forEach(p => {
                queue.push([p[1], p[0]]);
            });
        }
        const execute = queue.shift();
        if (execute) {
            time += Number(execute[0]);
            answer += time - execute[1];
        } else {
            time++;
        }
    }
    return Math.floor(answer / length);
}

console.log(
    solution([
        [0, 3],
        [1, 9],
        [2, 6],
    ]),
); // 9
