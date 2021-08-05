function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    const q = [];
    for (let i = 0; i < bridge_length; i++) {
        q.push(0);
    }
    let w = 0;
    while (truck_weights.length > 0) {
        answer++;
        const out = q.shift();
        w -= out;

        if (w + truck_weights[0] > weight) {
            q.push(0);
        } else {
            const now = truck_weights.shift();
            q.push(now);
            w += now;
        }
    }

    return answer + bridge_length;
}

console.log(solution(2, 10, [7, 4, 5, 6])); // 8
console.log(solution(100, 100, [10])); // 101
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // 110
