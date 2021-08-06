function combination(arr, num) {
    const result = [];
    if (num === 1) return arr.map(a => [a]);
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.slice(i + 1);
        const combined = combination(rest, num - 1);
        combined.forEach(c => {
            result.push([fixed, ...c].sort());
        });
    });
    return result;
}

console.log(combination([1, 2, 3], 2));

// 순열(combination)은 뽑은 다음에 순서를 생각해야 하지만 조합(combination)은 뽑기만 해도 됨
