const solution = s =>
    s
        .split(' ')
        .map(st =>
            st
                .split('')
                .map((str, i) =>
                    i === 0 ? str.toUpperCase() : str.toLowerCase(),
                )
                .join(''),
        )
        .join(' ');

console.log(solution('3people unFollowed me')); // "3people Unfollowed Me"
console.log(solution('for the last week')); // "For The Last Week"
