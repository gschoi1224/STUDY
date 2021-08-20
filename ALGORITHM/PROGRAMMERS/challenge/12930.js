const solution = s =>
    s
        .split(' ')
        .map(space =>
            space
                .split('')
                .map((str, i) =>
                    i % 2 === 0 ? str.toUpperCase() : str.toLowerCase(),
                )
                .join(''),
        )
        .join(' ');

console.log(solution('try hello world')); // "TrY HeLlO WoRlD"
