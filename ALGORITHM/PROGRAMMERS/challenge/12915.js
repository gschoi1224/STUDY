const solution = (strings, n) =>
    strings
        .sort()
        .sort((a, b) =>
            a[n] !== b[n] ? a.charCodeAt(n) - b.charCodeAt(n) : 0,
        );

console.log(solution(['sun', 'bed', 'car'], 1)); // ["car", "bed", "sun"]
console.log(solution(['abce', 'abcd', 'cdx'], 2)); // ["abcd", "abce", "cdx"]
