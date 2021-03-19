// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let array = []; // 각 정수는 1부터 N까지의 정수중 하나이며, 같은 정수가 두 번 이상 나타나지 않는다.
let cnt = 0; // 주어진 수열을 모두 같은 수로 만들고자 할 때 골라야 하는 최소 횟수

rl.on("line", function(line) {
    input = input.concat(line);
    if (input.length === 2) closeReadLine();
}).on("close", function() {
    process.exit();
});

const closeReadLine = () => {
    const N = parseInt(input[0].split(" ")[0]); // 수열의 길이를 나타내는 2 이상 10만 이하의 자연수
    const K = parseInt(input[0].split(" ")[1]); // 한 번에 연속적으로 골라야 하는 정수의 개수를 나타내는 2 이상 N 이하의 자연수

    array = input[1].split(" ").map((i) => parseInt(i));
    let index = 0;
    while (index < N) {
        if (index === 0) index += K;
        else index += K - 1;
        cnt++;
    }
    /*
        const MIN = Math.min(...array);
        let start = array.indexOf(MIN) - (array.indexOf(MIN) % (K - 1));
        let end = start + K;

        while (!array.every((i) => i === MIN)) {
            // console.log(`${cnt} : ${start} ~ ${end} ${array.slice(start, end)}`);
            if (end > N) {
                start = N - K;
                end = N;
            }
            if (
                array.slice(start, end).includes(MIN) &&
                !array.slice(start, end).every((i) => i === MIN)
            ) {
                const minArray = array.slice(start, end).map((i) => MIN);
                array.splice(start, K, ...minArray);
                console.log(cnt, array);
                cnt++;
            }
            if (end === N) start = 0;
            else start = end - 1;

            end = start + K;

            if (cnt > 20) break;
        }*/
    console.log(cnt);
    rl.close();
};