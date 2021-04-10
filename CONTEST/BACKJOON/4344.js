const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString();
const input = `5
5 50 50 70 80 100
7 100 95 90 80 70 60 50
3 70 90 80
3 70 90 81
9 100 99 98 97 96 95 94 93 91`;

const C = parseInt(input.split('\n')[0]);
let array = input.split('\n');
for (let i = 1 ; i <= C ; i++) {
    const arr = array[i].split(' ');
    let sum = 0;
    const cnt = arr[0];
    for (let k = 1; k < arr.length ; k++) {
        sum += parseInt(arr[k]);
    }
    const avg = parseFloat(sum / cnt);
    let resCnt = 0;
    for (let k = 1; k < arr.length ; k++) {
        if (arr[k] > avg) resCnt++;
    }
    const resPercent = (resCnt / cnt * 100).toFixed(3);
    console.log(resPercent + '%');
}