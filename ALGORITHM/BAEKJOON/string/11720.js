const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.output,
});

let N;
let nums;

rl.on('line', line => {
    if (!N) {
        N = Number(line);
    } else if (!nums) {
        nums = line.split('').map(Number);
        rl.close();
    }
}).on('close', () => {
    console.log(nums.reduce((cur, acc) => cur + acc, 0));
});
