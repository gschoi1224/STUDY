const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let T;
let arr = [];

rl.on('line', line => {
    if (!T) {
        T = Number(line);
    } else if (arr.length < T) {
        arr.push(line);
        if (arr.length === T) {
            rl.close();
        }
    }
}).on('close', () => {
    arr.forEach(a => {
        const [R, S] = a.split(' ');
        console.log(
            S.split('')
                .map(s => s.repeat(Number(R)))
                .join(''),
        );
    });
});
