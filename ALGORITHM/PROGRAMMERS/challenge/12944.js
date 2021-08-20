const solution = arr => arr.reduce((acc, cur) => acc + cur) / arr.length;
console.log(solution([1, 2, 3, 4])); // 2.5
console.log(solution([5, 5])); // 5
