function solution(numbers) {
    var answer = 0;
    const arr = new Set();
    for (let i = 1; i <= numbers.length; i++) {
        const pm = combination(numbers.split(''), i);
        pm.forEach(p => {
            arr.add(Number(p.join('')));
        });
    }
    arr.forEach(a => {
        if (a > 1) {
            let f = false;
            for (let i = 2; i <= parseInt(a / 2); i++) {
                if (a % i === 0) {
                    f = true;
                    break;
                }
            }
            if (!f) answer++;
        }
    });

    return answer;
}

function combination(arr, num) {
    const result = [];
    if (num === 1) return arr.map(a => [a]);
    arr.forEach((v, idx, arr) => {
        const fixed = v;
        const restArr = arr.filter((a, i) => i !== idx);
        const perArr = combination(restArr, num - 1);
        const comFix = perArr.map(a => [fixed, ...a]);
        result.push(...comFix);
    });
    return result;
}

console.log(solution('17')); // 3
console.log(solution('011')); // 2
