const answer = new Array(10000).fill(false).map((_, i) => i + 1);

for (let i = 1; i <= 10000; i++) {
    const ctr =
        i
            .toString()
            .split('')
            .map(Number)
            .reduce((cur, acc) => cur + acc, 0) + i;
    delete answer[ctr - 1];
}
answer.forEach(a => {
    a && console.log(a);
});
