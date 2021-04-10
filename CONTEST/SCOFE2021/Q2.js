// Run by Node.js
const readline = require('readline');

let N;  // 경로의 길이를 의미하는 3이상 50 이하 자연수
let route;  // 1과 0으로 구성된 경로, 첫 문자와 끝 문자는 항상 1이며, 0이 두 번 연속으로 들어오는 경우 없음
let cnt = 0;    //경우의 수
(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	
	for await (const line of rl) {
		route = N && line;
        N = N || line;
        if (route) {
            for (let i = 0 ; i < route.length - 1 ; i++) {
                if (route[i] === '1' && route[i + 1] === '1') {
                    cnt++;
                } else if (route[i] === '0') {
                    i += 2;
                }
            }
            console.log(cnt);
            rl.close();
        }
	}
	
	process.exit();
})();
