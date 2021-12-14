const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', line => {
    const num = Number(line);
    if (num === 1) {
        console.log(1);
    } else {
        let sum = 2;
        for (let i = 1; i < num; i++) {
            sum += 6 * i;
            if (num < sum) {
                console.log(i + 1);
                rl.close();
                break;
            }
        }
    }
    rl.close();
});
