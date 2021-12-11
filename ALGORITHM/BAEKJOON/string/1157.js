const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let str;
const dic = new Map();
let max = 0;
let answer;

rl.on('line', line => {
    if (!str) {
        str = line;
        rl.close();
    }
}).on('close', () => {
    str.split('')
        .map(s => s.toUpperCase())
        .forEach(s => {
            if (!dic.get(s)) {
                dic.set(s, 1);
            } else {
                dic.set(s, dic.get(s) + 1);
            }
        });
    for (let [key, val] of dic) {
        if (val > max) {
            answer = key;
            max = val;
        } else if (val === max) {
            answer = '?';
        }
    }
    console.log(answer);
});
