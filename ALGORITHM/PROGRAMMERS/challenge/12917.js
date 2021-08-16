const solution = s =>
    s
        .split('')
        .sort((a, b) => b.charCodeAt() - a.charCodeAt())
        .join('');

console.log(solution('Zbcdefg')); // "gfedcbZ"
