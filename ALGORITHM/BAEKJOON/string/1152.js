const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let str;

rl.on('line', line => {
    if (!str) {
        str = line;
        rl.close();
    }
}).on('close', () => {
    const answer = str
        .split(' ')
        .map(s => s.trim())
        .filter(e => e !== '' && e !== '\n');
    console.log(answer.length);
});
