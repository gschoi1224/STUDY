function solution(arr) {
    let i = Math.max(...arr);
    while (!arr.every(a => i % a === 0)) {
        i++;
    }
    return i;
}

console.log(solution([2, 6, 8, 14])); // 168
console.log(solution([1, 2, 3])); // 6
