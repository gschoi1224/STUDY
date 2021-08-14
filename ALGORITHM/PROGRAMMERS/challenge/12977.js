function solution(nums) {
    var answer = 0;
    nums.sort((a, b) => b - a);
    const MAX = nums.slice(0, 3).reduce((acc, cur) => acc + cur);
    const primes = new Array(MAX + 1).fill(true);
    let i = 2;
    while (i < primes.length && i !== -1) {
        if (primes[i]) {
            for (let k = 2; k * i < primes.length; k++) {
                primes[i * k] = false;
            }
        }
        i++;
    }
    const combi = combination(nums, 3);
    combi.forEach(c => {
        if (primes[c.reduce((acc, cur) => acc + cur)]) answer++;
    });
    return answer;
}

function combination(arr, num) {
    if (num === 1) return arr.map(a => [a]);
    const result = [];
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.slice(i + 1);
        const comb = combination(rest, num - 1);
        comb.forEach(c => {
            result.push([fixed, ...c]);
        });
    });
    return result;
}

console.log(solution([1, 2, 3, 4])); // 1
console.log(solution([1, 2, 7, 6, 4])); // 4
