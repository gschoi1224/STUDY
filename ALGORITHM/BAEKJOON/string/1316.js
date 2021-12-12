const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
const arr = [];

rl.on('line', line => {
    if (!N) {
        N = Number(line);
    } else {
        arr.push(line);
        if (arr.length === N) {
            rl.close();
        }
    }
}).on('close', () => {
    console.log(arr.reduce((acc, cur) => acc + isGroup(cur), 0));
});

function isGroup(str) {
    let flag = 1;
    const dic = [];
    if (str.length > 2) {
        for (let i = 0; i < str.length; i++) {
            if (i > 0 && dic.indexOf(str[i]) > -1 && str[i - 1] !== str[i]) {
                flag = 0;
            } else {
                dic.push(str[i]);
            }
        }
    }
    return flag;
}
