const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let S;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

rl.on('line', line => {
    if (!S) {
        S = line;
        console.log(
            alphabet
                .split('')
                .map(a => S.indexOf(a))
                .join(' '),
        );
        rl.close();
    }
});
