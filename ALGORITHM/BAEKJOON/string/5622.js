const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', line => {
    let answer = 0;
    line.split('').forEach(str => {
        const ascii = str.charCodeAt();
        if (ascii <= 67) {
            answer += 3;
        } else if (ascii <= 70) {
            answer += 4;
        } else if (ascii <= 73) {
            answer += 5;
        } else if (ascii <= 76) {
            answer += 6;
        } else if (ascii <= 79) {
            answer += 7;
        } else if (ascii <= 83) {
            answer += 8;
        } else if (ascii <= 86) {
            answer += 9;
        } else {
            answer += 10;
        }
    });
    console.log(answer);
    rl.close();
});
