const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let output = [];

rl.on("line", function(line) {
    input = input.concat(line);
    if (input.length + 1 === parseInt(input[0])) integerCoffee();
}).on("close", function() {
    process.exit();
});
// 하나의 상품으로 교환하기 위해서는 12장의 쿠폰이 필요하다.
// 이 쿠폰들 중 최소 5개는 시즌 한정 음료 쿠폰이어야 한다.
// 정수가 보유한 쿠폰으로 교환할 수 있는 최대 상품의 수를 계산하여 출력하시오.
const integerCoffee = () => {
    for (let i = 1; i < input.length; i++) {
        let cnt = 0;
        let N = parseInt(input[i].split(" ")[0]); // 정수가 보유한 시즌 한정 음료 쿠폰의 수
        let M = parseInt(input[i].split(" ")[1]); // 정수가 보유한 일반 음료 쿠폰의 수

        while (N >= 5 && M >= 7) {
            N -= 5;
            M -= 7;
            cnt++;
        }

        output = output.concat(cnt);
    }
    output.map((i) => {
        console.log(i);
    });
    rl.close();
};