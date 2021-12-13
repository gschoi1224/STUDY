const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', line => {
    const [a, b, c] = line.split(' ').map(Number);
    const x = c === b ? -1 : Math.floor(a / (c - b)) + 1;
    console.log(x < 1 ? -1 : x);
    rl.close();
});
