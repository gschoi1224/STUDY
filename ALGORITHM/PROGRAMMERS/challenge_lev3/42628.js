function solution(operations) {
    const q = new DoublePriorityQueue();
    operations.forEach(o => {
        const [oper, num] = o.split(' ');
        if (oper === 'I') {
            q.insert(Number(num));
        } else if (oper === 'D' && num === '1') {
            q.deleteMax();
        } else if (oper === 'D' && num === '-1') {
            q.deleteMin();
        }
    });
    let answer = [0, 0];
    if (q.list.length === 1) {
        answer = [q.list[0], q.list[0]];
    } else if (q.list.length > 1) {
        answer = [Math.max(...q.list), Math.min(...q.list)];
    }
    return answer;
}

class DoublePriorityQueue {
    list = [];
    constructor(...arg) {
        this.list = [...arg];
        this.list.sort((a, b) => b - a);
    }
    insert(num) {
        this.list.push(num);
        this.list.sort((a, b) => b - a);
    }
    deleteMax() {
        if (this.list.length > 0) {
            this.list.shift();
            this.list.sort((a, b) => b - a);
        }
    }
    deleteMin() {
        if (this.list.length > 0) {
            this.list.pop();
            this.list.sort((a, b) => b - a);
        }
    }
}

console.log(solution(['I 16', 'D 1'])); // 	[0,0]
console.log(solution(['I 7', 'I 5', 'I -5', 'D -1'])); // [7,5]
