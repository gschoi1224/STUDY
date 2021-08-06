function permutation(arr, num) {
    const result = [];
    if (num === 1) return arr.map(a => [a]);
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.filter((r, idx) => idx !== i);
        const combined = permutation(rest, num - 1);
        combined.forEach(c => {
            result.push([fixed, ...c]);
        });
    });
    return result;
}

console.log(permutation([1, 2, 3], 2));
