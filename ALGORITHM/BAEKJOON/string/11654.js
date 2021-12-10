const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let str;

rl.on('line', function (line) {
    if (!str) {
        str = line;
        rl.close();
    }
}).on('close', function () {
    console.log(str.charCodeAt(0));
});
