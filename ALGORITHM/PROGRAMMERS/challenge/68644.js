const solution = numbers => [
    ...new Set(
        combination(numbers, 2)
            .map(c => c.reduce((acc, cur) => acc + cur))
            .sort((a, b) => a - b),
    ),
];
const combination = (arr, num) => {
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
};

console.log(solution([2, 1, 3, 4, 1])); // [2,3,4,5,6,7]
console.log(solution([5, 0, 2, 7])); // [2,5,7,9,12]
