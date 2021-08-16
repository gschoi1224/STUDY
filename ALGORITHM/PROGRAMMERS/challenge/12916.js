const solution = s => s.match(/p/gi).length === s.match(/y/gi).length;
console.log(solution('pPoooyY')); // true
console.log(solution('Pyy')); // false
