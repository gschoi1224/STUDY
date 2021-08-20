const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
let n = -1,
    m = -1;
rl.on('line', function (line) {
    if (n === -1 || m === -1) {
        [n, m] = line.split(' ').map(Number);
        rl.close();
    }
}).on('close', function () {
    const arr = new Array(m).fill(0).map(_ => new Array(n).fill('*'));
    arr.forEach(a => {
        console.log(a.join(''));
    });
    process.exit();
});
