const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let output = [];
let T;

rl.on("line", function(line) {
    input = T ? input.concat(line) : [];
    T = T || parseInt(line);
    if (input.length === T) integerCoffee();
}).on("close", function() {
    process.exit();
});
// 하나의 상품으로 교환하기 위해서는 12장의 쿠폰이 필요하다.
// 이 쿠폰들 중 최소 5개는 시즌 한정 음료 쿠폰이어야 한다.
// 정수가 보유한 쿠폰으로 교환할 수 있는 최대 상품의 수를 계산하여 출력하시오.
const integerCoffee = () => {
    input.map(v => {
        let cnt = 0;
        let N = BigInt(v.split(" ")[0]); // 정수가 보유한 시즌 한정 음료 쿠폰의 수
        let M = BigInt(v.split(" ")[1]); // 정수가 보유한 일반 음료 쿠폰의 수
        cnt = BigInt(N / BigInt(5)) > BigInt((N + M) / BigInt(12)) ? BigInt((N + M) / BigInt(12)) : BigInt(N / BigInt(5));
        // N -= (cnt * 5);
        // M -= (cnt * 7);
        // if (N >= 5 && N + M >= 12) {
        //     N -= (12 - M);
        //     M -= M; 
        //     cnt++;
        // }
        // if (N >= 12) {
        //     cnt += parseInt(N / 12);
        // }
        while(N + M < BigInt(12) * cnt) {
            if (cnt === 0) break;
            cnt--;
        }
        //console.log(`남은 한정 : ${N}, 일반 : ${M}`);
        console.log(cnt.toString().replace('n', ''));
    });
    rl.close();
};