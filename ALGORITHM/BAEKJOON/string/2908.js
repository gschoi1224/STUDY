const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', line => {
    const [a, b] = line.split(' ');
    console.log(
        Math.max(
            Number(a.split('').reverse().join('')),
            Number(b.split('').reverse().join('')),
        ),
    );
    rl.close();
});
