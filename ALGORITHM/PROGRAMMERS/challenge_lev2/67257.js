function solution(expression) {
    let answer = 0;
    const sign = expression.replace(/[0-9]/gi, '').split('');
    const nums = expression.split(/[^0-9]/gi);
    const set = new Set(sign);
    for (let p of permutations([...set], set.size)) {
        const tempNum = nums.map(n => n);
        const tempSign = sign.map(s => s);
        for (let i = 0; i < set.size; i++) {
            while (tempSign.indexOf(p[i]) > -1) {
                const idx = tempSign.indexOf(p[i]);
                const now = tempSign.splice(idx, 1);
                const val = tempNum[idx] + now + tempNum[idx + 1];
                tempNum.splice(idx, 2, eval(val));
            }
        }
        answer = Math.max(Math.abs(Number(tempNum[0])), answer);
    }
    return answer;
}
const permutations = (arr, num) => {
    if (num === 1) return arr.map(a => [a]);
    const result = [];
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.filter((_, idx) => idx !== i);
        const permuted = permutations(rest, num - 1);
        permuted.forEach(p => {
            result.push([fixed, ...p]);
        });
    });
    return result;
};

console.log(solution('100-200*300-500+20')); // 60420
console.log(solution('50*6-3*2')); // 300
