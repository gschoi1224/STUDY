function solution(n, words) {
    let i = 0;
    const used = [];
    while (words.length) {
        const user = (i % n) + 1;
        const word = words.shift();
        console.log(i, user, word);
        if (
            used.indexOf(word) > -1 ||
            (used.length && used[used.length - 1].slice(-1) !== word[0])
        ) {
            return [user, Math.ceil((i + 1) / n)];
        } else {
            used.push(word);
            i++;
        }
    }
    return [0, 0];
}

console.log(
    solution(3, [
        'tank',
        'kick',
        'know',
        'wheel',
        'land',
        'dream',
        'mother',
        'robot',
        'tank',
    ]),
); // [3, 3]
console.log(
    solution(5, [
        'hello',
        'observe',
        'effect',
        'take',
        'either',
        'recognize',
        'encourage',
        'ensure',
        'establish',
        'hang',
        'gather',
        'refer',
        'reference',
        'estimate',
        'executive',
    ]),
); // [0, 0]
console.log(
    solution(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw']),
); // [1, 3]
