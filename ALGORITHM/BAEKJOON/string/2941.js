const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const croa = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z='];
let answer = 0;
rl.on('line', line => {
    croa.forEach(c => {
        const regex = new RegExp(c, 'gi');
        if (line.match(regex)) {
            answer += line.match(regex).length;
            line = line.replace(regex, ' ');
        }
    });
    console.log(line.replace(/ /gi, '').length + answer);
    rl.close();
});
