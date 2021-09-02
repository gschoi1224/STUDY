const solution = s =>
    [Math.min(...s.split(' ')), Math.max(...s.split(' '))].join(' ');

console.log(solution('1 2 3 4')); // "1 4"
console.log(solution('-1 -2 -3 -4')); // "-4 -1"
console.log(solution('-1 -1')); // "-1 -1"
