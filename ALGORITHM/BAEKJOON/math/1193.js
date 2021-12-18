const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', line => {
    let n = Number(line);
    let a = 1;
    while (n > a) {
        n = n - a;
        a++;
    }
    if (a % 2 === 0) {
        console.log(`${n}/${a - n + 1}`);
    } else {
        console.log(`${a - n + 1}/${n}`);
    }
    rl.close();
});
