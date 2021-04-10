// Run by Node.js
const readline = require('readline');

let N;  // 한 변 길이를 의미하는 3이상 50 이하 자연수
let input = [];  // 최소 강간의 상태는 0, 1로 구성 각 줄마다 길이가 N인 문자열로 주어짐 검게 칠해진 공간이 1
let total = 0;  // 상품을 배치할 수 있는 모든 경우의 수
let size = [] ; // 줄 바꿈마다 사이즈 오름차순으로 배치 가능한 수
(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	
	for await (const line of rl) {
        input = N ? input.concat(line) : [];
        N = N || parseInt(line);
        if (input.length === N) {
            size = new Array(N);
            let array = [];
            for (let i = 0 ; i < N ; i++) {
                array[i] = input[i].split('');
            }
            for (let i = 0 ; i < array.length ; i++) {
                for (let k = 0 ; k < array[i].length; k++) {
                    const max = (k < i) ? i : k;
                    for (let s = 1 ; s <= N - max ; s++) {
                        // console.log(`(${i}, ${k})`);
                        let possibleCnt = 0;
                        if (s === 1) {
                            if (array[i][k] === '1') possibleCnt++;
                        } else {
                            for (let row = i ; row < i + s; row++) {
                                const item = array[row];
                                // console.log(`${row} 행의 ${k}열부터 ${s}개 : ${item.slice(k, s + k)} -> ${item.slice(k, s + k).every(me => me === '1')}`);
                                if (item.slice(k, s + k).every(me => me === '1')) 
                                    possibleCnt++;
                            }
                        }
                        if (possibleCnt === s) {
                            size[s]  = size[s] ? size[s] + 1 : 1;
                            size[0] = size[0] ? size[0] + 1 : 1;
                        } 
                    }
                }
            }
            console.log(`total: ${size[0]}`);
            for (let i = 1; i < size.length; i++) {
                if (size[i]) {
                    console.log(`size[${i}]: ${size[i]}`);
                }
            }
            rl.close();
        }
	}
	
	process.exit();
})();

