function solution(n, lost, reserve) {
    const arr = new Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        if (lost.includes(i + 1)) arr[i] -= 1;
        if (reserve.includes(i + 1)) arr[i] += 1;
    }
    arr.forEach((a, i) => {
        if (a === 0) {
            if (i > 0 && arr[i - 1] === 2) {
                arr[i - 1] -= 1;
                arr[i] += 1;
            } else if (i < n - 1 && arr[i + 1] === 2) {
                arr[i + 1] -= 1;
                arr[i] += 1;
            }
        }
    });
    return arr.filter(a => a > 0).length;
}

console.log(solution(5, [2, 4], [1, 3, 5])); // 5
console.log(solution(5, [2, 4], [3])); // 4
console.log(solution(3, [3], [1])); // 2
