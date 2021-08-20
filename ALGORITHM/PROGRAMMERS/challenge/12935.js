const solution = arr => {
    const answer = arr.filter(a => Math.min(...arr) !== a);
    return answer.length ? answer : [-1];
};

console.log(solution([4, 3, 2, 1])); // [4,3,2]
console.log(solution([10])); // [-1]
