const solution = s =>
    (s.length === 4 || s.length === 6) &&
    s.split('').filter(a => isNaN(a)).length === 0;

console.log(solution('a234')); // false
console.log(solution('1e22')); // true
