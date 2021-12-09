const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
rl.on('line', function (line) {
    if (!N) {
        N = parseInt(line);
        rl.close();
    }
}).on('close', function () {
    let answer = 0;
    for (let i = 1; i <= N; i++) {
        if (isArthmetic(i)) answer++;
    }
    console.log(answer);
});

function isArthmetic(num) {
    let flag = true;
    if (num > 99) {
        num.toString()
            .split('')
            .map(Number)
            .forEach((n, i, arr) => {
                if (i > 0 && arr[1] - arr[0] !== n - arr[i - 1]) {
                    flag = false;
                }
            });
    }
    return flag;
}
